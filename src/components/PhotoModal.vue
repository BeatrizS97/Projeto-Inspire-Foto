<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useFavorites } from '../composables/useFavorites'

const props = defineProps({ photo: { type: Object, required: true } })
const emit  = defineEmits(['close'])

const { isFavorite, toggle } = useFavorites()

onMounted(() => {
  window.addEventListener('keydown', onKey)
  document.body.style.overflow = 'hidden'
})
onUnmounted(() => {
  window.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})

function onKey(e) { if (e.key === 'Escape') emit('close') }

function onError(e) {
  e.target.src = `https://picsum.photos/seed/fallback/600/800`
}
</script>

<template>
  <Teleport to="body">
    <div class="modal-backdrop" @click.self="$emit('close')" role="dialog" aria-modal="true">
      <div class="modal-box">

        <!-- Fechar: X diagonal editorial (não o × genérico) -->
        <button class="modal-close" @click="$emit('close')" aria-label="Fechar">
          <svg viewBox="0 0 18 18" fill="none">
            <line x1="2" y1="2" x2="16" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            <line x1="16" y1="2" x2="2" y2="16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- Imagem protegida -->
        <div class="modal-img-wrap" @contextmenu.prevent>
          <img
            :src="photo.download_url ?? `https://picsum.photos/seed/${photo.seed}/900/1200`"
            :alt="photo.title"
            draggable="false"
            @error="onError"
            @contextmenu.prevent
          />
          <div class="img-shield" />
          <span class="img-watermark" aria-hidden="true">© inspirefoto</span>
        </div>

        <!-- Painel lateral -->
        <div class="modal-panel">
          <div class="modal-meta">
            <span class="modal-cat">{{ photo.catLabel }}</span>
            <h3 class="modal-title">{{ photo.title }}</h3>
          </div>

          <!-- Salvar: mesmo losango do Card, mantém coerência visual -->
          <button
            class="modal-save"
            :class="{ saved: isFavorite(photo.id) }"
            @click="toggle(photo.id)"
          >
            <svg viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3 L17 10 L10 17 L3 10 Z"
                :fill="isFavorite(photo.id) ? '#E1306C' : 'transparent'"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linejoin="round"
              />
              <circle
                cx="10" cy="10" r="2"
                :fill="isFavorite(photo.id) ? 'white' : 'rgba(255,255,255,0.5)'"
              />
            </svg>
            {{ isFavorite(photo.id) ? 'Salvo' : 'Salvar' }}
          </button>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  backdrop-filter: blur(6px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }

.modal-box {
  position: relative;
  display: flex;
  border-radius: 10px;
  overflow: hidden;
  max-height: 90vh;
  animation: rise 0.22s ease;
}

@keyframes rise {
  from { transform: translateY(14px); opacity: 0 }
  to   { transform: translateY(0);    opacity: 1 }
}

.modal-close {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  z-index: 10;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.8);
  cursor: pointer;
  transition: background 0.2s;

  svg { width: 14px; height: 14px; }
  &:hover { background: rgba(0,0,0,0.65); color: white; }
}

.modal-img-wrap {
  position: relative;
  max-width: 62vw;
  max-height: 90vh;
  overflow: hidden;
  user-select: none;
  -webkit-user-select: none;
  flex-shrink: 0;

  img {
    display: block;
    height: 100%;
    max-height: 90vh;
    max-width: 62vw;
    width: auto;
    object-fit: contain;
    pointer-events: none;
    -webkit-user-drag: none;
  }
}

.img-shield {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.img-watermark {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  color: rgba(255,255,255,0.2);
  z-index: 3;
  pointer-events: none;
  user-select: none;
}

.modal-panel {
  background: #141414;
  padding: 2rem 1.75rem;
  min-width: 190px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.modal-cat {
  font-size: 0.62rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent);
}

.modal-title {
  font-family: 'Georgia', serif;
  font-size: 1.1rem;
  font-weight: 400;
  color: white;
  line-height: 1.4;
}

.modal-save {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 7px;
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.6);
  cursor: pointer;
  transition: all 0.2s;

  svg { width: 16px; height: 16px; }

  &:hover {
    background: rgba(225,48,108,0.1);
    border-color: rgba(225,48,108,0.25);
    color: var(--accent);
  }

  &.saved {
    background: rgba(225,48,108,0.12);
    border-color: rgba(225,48,108,0.35);
    color: var(--accent);
  }
}

@media (max-width: 768px) {
  .modal-box { flex-direction: column; max-width: 92vw; }
  .modal-img-wrap,
  .modal-img-wrap img { max-width: 92vw; max-height: 55vh; }
  .modal-panel { min-width: auto; padding: 1.25rem 1.5rem; }
}
</style>