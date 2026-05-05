<script setup>
import { ref } from 'vue'
import { useFavorites } from '../composables/useFavorites'

defineProps({ currentPage: { type: String, default: 'home' } })
const emit = defineEmits(['navigate'])

const { count } = useFavorites()
const menuOpen = ref(false)

function navigate(page) {
  emit('navigate', page)
  menuOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="header-inner">

      <!-- ── Logo ─ -->
      <button class="logo" @click="navigate('home')" aria-label="Início">
        <!-- Ícone: diafragma fotográfico estilizado — único, editorial -->
        <svg class="logo-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <!-- Pétala 1 -->
          <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.9"/>
          <!-- Pétala 2 (rotacionada 60°) -->
          <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.7"
            transform="rotate(60 20 20)"/>
          <!-- Pétala 3 (rotacionada 120°) -->
          <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.5"
            transform="rotate(120 20 20)"/>
          <!-- Pétala 4 (rotacionada 180°) -->
          <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#c1285c" opacity="0.9"
            transform="rotate(180 20 20)"/>
          <!-- Pétala 5 (rotacionada 240°) -->
          <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#c1285c" opacity="0.7"
            transform="rotate(240 20 20)"/>
          <!-- Pétala 6 (rotacionada 300°) -->
          <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#c1285c" opacity="0.5"
            transform="rotate(300 20 20)"/>
          <!-- Centro -->
          <circle cx="20" cy="20" r="4" fill="white"/>
          <circle cx="20" cy="20" r="2" fill="#E1306C"/>
        </svg>
        <span class="logo-wordmark">inspire<em>foto</em></span>
      </button>

      <!-- ── Nav desktop ── -->
      <nav class="desktop-nav" aria-label="Navegação principal">
        <button
          :class="{ active: currentPage === 'home' }"
          @click="navigate('home')"
        >Início</button>
        <button
          :class="{ active: currentPage === 'gallery' }"
          @click="navigate('gallery')"
        >Galerias</button>
        <button
          :class="{ active: currentPage === 'favorites' }"
          @click="navigate('favorites')"
        >
          Favoritos
          <span v-if="count() > 0" class="nav-badge">{{ count() }}</span>
        </button>
      </nav>

      <!-- ── Ação: lupa (ícone personalizado — lente fotográfica) ── -->
      <button class="icon-btn search-btn" aria-label="Buscar">
        <!-- Lente de câmera / lupa editorial -->
        <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" stroke-width="1.4"/>
          <circle cx="9" cy="9" r="3.5" stroke="currentColor" stroke-width="1" stroke-dasharray="1.5 1.5"/>
          <line x1="14" y1="14" x2="20" y2="20" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>

      <!-- ── Mobile: hambúrguer minimalista ── -->
      <button
        class="icon-btn menu-btn"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <svg viewBox="0 0 22 22" fill="none">
          <line
            x1="3" y1="7" x2="19" y2="7"
            stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
            :style="menuOpen ? 'transform:rotate(45deg);transform-origin:11px 7px' : ''"
            style="transition:.25s"
          />
          <line
            x1="3" y1="11" x2="19" y2="11"
            stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
            :style="menuOpen ? 'opacity:0' : ''"
            style="transition:.25s"
          />
          <line
            x1="3" y1="15" x2="19" y2="15"
            stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
            :style="menuOpen ? 'transform:rotate(-45deg);transform-origin:11px 15px' : ''"
            style="transition:.25s"
          />
        </svg>
      </button>
    </div>

    <!-- ── Mobile nav ── -->
    <nav class="mobile-nav" :class="{ open: menuOpen }" aria-label="Menu mobile">
      <button @click="navigate('home')">Início</button>
      <button @click="navigate('gallery')">Galerias</button>
      <button @click="navigate('favorites')">
        Favoritos
        <span v-if="count() > 0" class="nav-badge">{{ count() }}</span>
      </button>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255,255,255,0.92);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--border);
}

.header-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0.9rem 2rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* ── Logo ── */
.logo {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  flex-shrink: 0;
}

.logo-icon {
  width: 34px;
  height: 34px;
  transition: transform 0.4s ease;

  .logo:hover & { transform: rotate(30deg); }
}

.logo-wordmark {
  font-family: 'Georgia', 'Times New Roman', serif;
  font-size: 1.25rem;
  font-weight: 400;
  color: var(--ink);
  letter-spacing: -0.02em;
  line-height: 1;

  em {
    font-style: italic;
    color: var(--accent);
  }
}

/* ── Desktop nav ── */
.desktop-nav {
  flex: 1;
  display: flex;
  justify-content: center;
  gap: 0.15rem;

  button {
    position: relative;
    background: none;
    border: none;
    padding: 0.45rem 1.1rem;
    font-size: 0.875rem;
    font-weight: 400;
    color: var(--muted);
    border-radius: 100px;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
    letter-spacing: 0.01em;

    &:hover { color: var(--ink); background: rgba(0,0,0,0.04); }
    &.active { color: var(--accent); background: rgba(225,48,108,0.07); }
  }
}

/* ── Badge ── */
.nav-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--accent);
  color: white;
  font-size: 0.6rem;
  font-weight: 600;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-left: 0.3rem;
  vertical-align: middle;
  line-height: 1;
}

/* ── Ícones ── */
.icon-btn {
  background: none;
  border: none;
  color: var(--muted);
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  flex-shrink: 0;

  svg { width: 20px; height: 20px; display: block; }
  &:hover { color: var(--accent); }
}

.search-btn { margin-left: auto; }
.menu-btn   { display: none; }

/* ── Mobile nav ── */
.mobile-nav {
  display: none;
  flex-direction: column;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, opacity 0.3s ease;
  opacity: 0;

  &.open {
    display: flex;
    max-height: 280px;
    opacity: 1;
    border-top: 1px solid var(--border);
  }

  button {
    background: none;
    border: none;
    padding: 1rem 2rem;
    font-size: 1rem;
    color: var(--ink);
    text-align: left;
    cursor: pointer;
    transition: color 0.2s, background 0.2s;
    border-bottom: 1px solid var(--border);
    width: 100%;

    &:last-child { border-bottom: none; }
    &:hover { 
      color: var(--accent);
      background: rgba(225,48,108,0.03);
    }
  }
}

@media (max-width: 768px) {
  .desktop-nav, .search-btn { display: none; }
  .menu-btn { 
    display: flex;
    margin-left: auto; // Garante que fique no canto direito
  }
  .header-inner { 
    padding: 0.85rem 1.25rem;
  }
  .mobile-nav {
    button {
      padding: 1rem 1.25rem;
    }
  }
}

@media (max-width: 480px) {
  .header-inner {
    padding: 0.75rem 1rem;
  }
  .logo-wordmark {
    font-size: 1.15rem;
  }
  .logo-icon {
    width: 30px;
    height: 30px;
  }
}
</style>