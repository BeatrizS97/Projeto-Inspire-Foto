<script setup>
import { useFavorites } from '../composables/useFavorites'
import { photoUrl } from '../composables/usePhotos'

const props = defineProps({
  photo: { type: Object, required: true },
})

const emit = defineEmits(['open'])

const { isFavorite, toggle } = useFavorites()

function handleFav(e) {
  e.stopPropagation()
  toggle(props.photo.id)
}

function onError(e) {
  e.target.src = `https://picsum.photos/seed/fallback/600/800`
}
</script>

<template>
  <article
    class="card"
    @click="$emit('open', photo)"
    @contextmenu.prevent
  >
    <!-- Proteção: bloqueia drag, seleção e clique-direito na imagem -->
    <div class="shield" @dragstart.prevent @selectstart.prevent />

    <img
      :src="photoUrl(photo.seed)"
      :alt="photo.title"
      class="card-img"
      draggable="false"
      @error="onError"
      @contextmenu.prevent
    />

    <!-- Overlay gradiente + metadados -->
    <div class="card-overlay">
      <span class="card-cat">{{ photo.catLabel }}</span>
      <p class="card-title">{{ photo.title }}</p>
    </div>

    <!-- Botão favoritar: ícone de abertura de diafragma / coração editorial -->
    <button
      class="fav-btn"
      :class="{ active: isFavorite(photo.id) }"
      :aria-label="isFavorite(photo.id) ? 'Remover dos favoritos' : 'Salvar nos favoritos'"
      @click="handleFav"
    >
      <!--
        Ícone customizado: losango suave — mais editorial que um coração genérico.
        Preenchido quando favoritado.
      -->
      <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 3 L17 10 L10 17 L3 10 Z"
          :fill="isFavorite(photo.id) ? '#E1306C' : 'transparent'"
          stroke="white"
          stroke-width="1.3"
          stroke-linejoin="round"
        />
        <circle
          cx="10" cy="10" r="2"
          :fill="isFavorite(photo.id) ? 'white' : 'rgba(255,255,255,0.6)'"
        />
      </svg>
    </button>

    <!-- Marca d'água discreta -->
    <span class="watermark" aria-hidden="true">© inspirefoto</span>
  </article>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 3/4;
  cursor: pointer;
  background: var(--surface);
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;

  &:hover .card-img     { transform: scale(1.04); }
  &:hover .card-overlay { opacity: 1; }
  &:hover .fav-btn      { opacity: 1; }
  &:hover .watermark    { opacity: 0.4; }
}

.shield {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none; /* cliques passam para o article */
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.55s ease;
  pointer-events: none;
  -webkit-user-drag: none;
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%);
  opacity: 0;
  transition: opacity 0.3s;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  gap: 0.2rem;
}

.card-cat {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.6);
}

.card-title {
  font-size: 0.82rem;
  color: white;
  line-height: 1.3;
  font-weight: 400;
}

.fav-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 4;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.18);
  background: rgba(0,0,0,0.32);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.25s, transform 0.2s, background 0.2s;

  svg { width: 16px; height: 16px; }

  &:hover {
    background: rgba(0,0,0,0.5);
    transform: scale(1.08);
  }

  &.active {
    opacity: 1;
    background: rgba(225,48,108,0.25);
    border-color: rgba(225,48,108,0.4);
  }
}

.watermark {
  position: absolute;
  bottom: 8px;
  left: 10px;
  font-size: 0.58rem;
  letter-spacing: 0.07em;
  color: rgba(255,255,255,0.12);
  z-index: 4;
  pointer-events: none;
  user-select: none;
  opacity: 0;
  transition: opacity 0.3s;
}

@media (max-width: 768px) {
  .card { aspect-ratio: 1/1; }
  .fav-btn { opacity: 1; }
  .card-overlay { opacity: 1; }
}
</style>