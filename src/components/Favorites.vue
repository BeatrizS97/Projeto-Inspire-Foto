<script setup>
import { computed } from 'vue'
import Card from './Card.vue'
import { useFavorites } from '../composables/useFavorites'
import { usePhotos } from '../composables/usePhotos'

const emit = defineEmits(['open-photo'])

const { favorites } = useFavorites()
const { byId, label } = usePhotos()

const savedPhotos = computed(() =>
  favorites.value
    .map(id => byId(id))
    .filter(Boolean)
    .map(p => ({ ...p, catLabel: label(p.category) }))
)
</script>

<template>
  <section class="favorites-page">
    <div class="favorites-header">
      <p class="eyebrow">Coleção pessoal</p>
      <h2>Favoritos</h2>
      <p v-if="savedPhotos.length > 0" class="saved-count">
        {{ savedPhotos.length }}
        {{ savedPhotos.length === 1 ? 'fotografia salva' : 'fotografias salvas' }}
      </p>
    </div>

    <!-- Estado vazio -->
    <div v-if="savedPhotos.length === 0" class="empty">
      <!--
        Ícone de estado vazio: losango vazio (coerente com o ícone do Card)
        sem os genéricos corações ou estrelas
      -->
      <svg class="empty-icon" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M30 8 L52 30 L30 52 L8 30 Z" stroke="#ddd" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="30" cy="30" r="5" stroke="#ddd" stroke-width="1.5"/>
        <path d="M30 19 L30 15M30 45 L30 41M19 30 L15 30M45 30 L41 30"
          stroke="#ddd" stroke-width="1.2" stroke-linecap="round"/>
      </svg>
      <h3>Nenhuma fotografia salva</h3>
      <p>Explore as galerias e clique no ◇ para criar sua coleção.</p>
    </div>

    <!-- Grid de favoritos -->
    <div v-else class="favorites-grid">
      <Card
        v-for="photo in savedPhotos"
        :key="photo.id"
        :photo="photo"
        @open="$emit('open-photo', photo)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.favorites-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.favorites-header {
  margin-bottom: 2.5rem;

  .eyebrow {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--accent);
    margin-bottom: 0.45rem;
  }

  h2 {
    font-family: 'Georgia', serif;
    font-size: 2.4rem;
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 0.4rem;
  }

  .saved-count {
    font-size: 0.82rem;
    color: var(--subtle);
  }
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 6rem 2rem;
  gap: 1rem;

  .empty-icon {
    width: 56px;
    height: 56px;
    margin-bottom: 0.5rem;
    opacity: 0.5;
  }

  h3 {
    font-family: 'Georgia', serif;
    font-size: 1.3rem;
    font-weight: 400;
    color: #aaa;
  }

  p {
    font-size: 0.88rem;
    color: #bbb;
    max-width: 280px;
    line-height: 1.6;
  }
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;
}

@media (max-width: 1200px) { .favorites-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
  .favorites-page { padding: 3rem 1rem; }
  .favorites-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
}
</style>