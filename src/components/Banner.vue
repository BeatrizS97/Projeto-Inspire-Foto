<!-- src/components/Banner.vue -->
<script setup>
import { useBannerCarousel } from '../composables/useBannerCarousel'

defineEmits(['navigate'])

const {
  currentIndex,
  currentImage,
  nextImage,
  isHovering,
  next,
  prev,
  onMouseEnter,
  onMouseLeave,
} = useBannerCarousel()
</script>

<template>
  <section class="banner">
    <div class="banner-text">
      <p class="eyebrow">Fotografia de Paisagem</p>
      <h1>
        Onde a luz<br />
        encontra a<br />
        <em>alma</em> do lugar.
      </h1>
      <p class="banner-desc">
        Cada frame é uma história silenciosa — explorada, sentida e preservada
        através da lente de quem enxerga o mundo diferente.
      </p>
      <div class="banner-actions">
        <button class="btn-primary" @click="$emit('navigate', 'gallery')">
          Ver Portfólio
          <svg viewBox="0 0 16 10" fill="none" aria-hidden="true">
            <line x1="0" y1="5" x2="13" y2="5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            <path d="M9 1 L13 5 L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="btn-ghost" @click="$emit('navigate', 'favorites')">
          Favoritos
        </button>
      </div>
    </div>

    <div class="banner-visual">
      <div 
        class="photo-stack"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <!-- Imagem de trás (próxima) -->
        <div class="frame frame-back">
          <img 
            :src="`https://picsum.photos/seed/${nextImage.seed}/500/650`" 
            :alt="nextImage.alt" 
            draggable="false" 
            @contextmenu.prevent 
          />
        </div>
        
        <!-- Imagem da frente (atual) -->
        <div class="frame frame-front">
          <img 
            :src="`https://picsum.photos/seed/${currentImage.seed}/500/650`" 
            :alt="currentImage.alt" 
            draggable="false" 
            @contextmenu.prevent 
          />
          <div class="frame-protect" />
        </div>

        <!-- Botões de navegação (invisíveis até hover) -->
        <button 
          class="nav-arrow nav-prev"
          @click="prev"
          :class="{ visible: isHovering }"
          aria-label="Imagem anterior"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <button 
          class="nav-arrow nav-next"
          @click="next"
          :class="{ visible: isHovering }"
          aria-label="Próxima imagem"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Indicadores de posição -->
        <div class="indicators">
          <span 
            v-for="(img, index) in images" 
            :key="img.seed"
            class="indicator"
            :class="{ active: index === currentIndex }"
          />
        </div>

        <div class="badge">
          <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.9"/>
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.7" transform="rotate(120 20 20)"/>
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.5" transform="rotate(240 20 20)"/>
            <circle cx="20" cy="20" r="4" fill="white"/>
          </svg>
          <span>Portfólio 2024</span>
        </div>
      </div>

      <div class="banner-stats">
        <div class="stat"><strong>+500</strong><span>Fotografias</span></div>
        <div class="divider" />
        <div class="stat"><strong>5</strong><span>Categorias</span></div>
        <div class="divider" />
        <div class="stat"><strong>8</strong><span>Anos</span></div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 5rem 2rem 4rem;
}

.banner-text {
  .eyebrow {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--accent);
    margin-bottom: 1.5rem;
  }

  h1 {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-size: clamp(2.4rem, 4vw, 3.8rem);
    font-weight: 400;
    line-height: 1.1;
    color: var(--ink);
    margin-bottom: 1.5rem;

    em { font-style: italic; color: var(--accent); }
  }

  .banner-desc {
    font-size: 0.95rem;
    line-height: 1.75;
    color: var(--muted);
    max-width: 400px;
    margin-bottom: 2.5rem;
  }
}

.banner-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--ink);
  color: white;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.25s, transform 0.2s;

  svg { width: 14px; height: 9px; }
  &:hover { background: var(--accent); transform: translateY(-1px); }
}

.btn-ghost {
  background: transparent;
  color: var(--ink);
  border: 1px solid var(--border);
  padding: 0.8rem 1.6rem;
  border-radius: 100px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: border-color 0.2s, color 0.2s;

  &:hover { border-color: var(--accent); color: var(--accent); }
}

/* Visual */
.banner-visual {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2rem;
}

.photo-stack {
  position: relative;
  width: min(420px, 100%);
  aspect-ratio: 4/5;
}

.frame {
  position: absolute;
  border-radius: 10px;
  overflow: hidden;
  transition: opacity 0.6s ease, transform 0.6s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
    -webkit-user-drag: none;
    user-select: none;
  }

  &.frame-back {
    inset: 0;
    transform: rotate(4deg) translate(12px, -10px);
    filter: brightness(0.7) saturate(0.7);
    z-index: 1;
    opacity: 0.8;
  }

  &.frame-front {
    inset: 0;
    z-index: 2;
    box-shadow: 0 20px 56px rgba(0,0,0,0.2);
  }
}

.frame-protect {
  position: absolute;
  inset: 0;
  z-index: 3;
  pointer-events: none;
}

/* Botões de navegação */
.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  color: var(--ink);

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.05);
  }

  &.visible {
    opacity: 1;
    visibility: visible;
  }

  &.nav-prev {
    left: -22px;
  }

  &.nav-next {
    right: -22px;
  }
}

/* Indicadores */
.indicators {
  position: absolute;
  bottom: 60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.photo-stack:hover .indicators {
  opacity: 1;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;

  &.active {
    background: white;
    transform: scale(1.2);
    border-color: rgba(0, 0, 0, 0.1);
  }

  &:hover:not(.active) {
    background: rgba(255, 255, 255, 0.8);
  }
}

.badge {
  position: absolute;
  bottom: -14px;
  left: -14px;
  background: white;
  border: 1px solid rgba(0,0,0,0.07);
  border-radius: 100px;
  padding: 0.45rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.72rem;
  color: #333;
  box-shadow: 0 4px 14px rgba(0,0,0,0.08);
  z-index: 4;
}

.banner-stats {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: white;
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 0.9rem 1.75rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.05);

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    strong { font-size: 1.25rem; font-weight: 700; color: var(--ink); line-height: 1; }
    span   { font-size: 0.65rem; color: var(--subtle); text-transform: uppercase; letter-spacing: 0.06em; }
  }

  .divider { width: 1px; height: 26px; background: var(--border); }
}

@media (max-width: 1024px) {
  .banner { grid-template-columns: 1fr; padding: 3rem 2rem; }
  .banner-visual { align-items: center; }
  .photo-stack { width: min(360px, 100%); }
  
  .nav-arrow {
    &.nav-prev { left: -18px; }
    &.nav-next { right: -18px; }
  }
}

@media (max-width: 480px) {
  .banner { padding: 2rem 1rem; gap: 2.5rem; }
  .banner-stats { gap: 0.9rem; padding: 0.75rem 1.25rem; }
  .photo-stack { width: min(300px, 100%); }
  
  .nav-arrow {
    width: 36px;
    height: 36px;
    &.nav-prev { left: -10px; }
    &.nav-next { right: -10px; }
    
    svg { width: 16px; height: 16px; }
  }
}
</style>