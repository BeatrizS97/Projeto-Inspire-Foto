<script setup>
defineEmits(['navigate'])
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
          <!-- Seta coerente com Gallery.vue -->
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
      <div class="photo-stack">
        <div class="frame frame-back">
          <img src="https://picsum.photos/seed/banner2/500/650" alt="" draggable="false" @contextmenu.prevent />
        </div>
        <div class="frame frame-front">
          <img src="https://picsum.photos/seed/banner1/500/650" alt="Fotografia em destaque" draggable="false" @contextmenu.prevent />
          <div class="frame-protect" />
        </div>
        <div class="badge">
          <!-- Pequeno diafragma mini — coerente com a logo -->
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
}

@media (max-width: 480px) {
  .banner { padding: 2rem 1rem; gap: 2.5rem; }
  .banner-stats { gap: 0.9rem; padding: 0.75rem 1.25rem; }
}
</style>