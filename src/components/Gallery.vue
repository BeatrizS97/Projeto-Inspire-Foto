<script setup>
import { ref, computed } from 'vue'
import Card from './Card.vue'
import { usePhotos, category_labels } from '../composables/usePhotos'

const emit = defineEmits(['open-photo'])

const { photos, byCategory, label } = usePhotos()

const activeCategory = ref('all')

const categories = [
  { id: 'all',       name: 'Todas'     },
  { id: 'paisagens', name: 'Paisagens' },
  { id: 'eventos',   name: 'Eventos'   },
  { id: 'retratos',  name: 'Retratos'  },
  { id: 'urbano',    name: 'Urbano'    },
  { id: 'natureza',  name: 'Natureza'  },
]

// Seções (vista "Todas"): cada categoria com suas fotos
const sections = computed(() =>
  Object.keys(category_labels).map(cat => ({
    id: cat,
    name: category_labels[cat],
    photos: byCategory(cat).slice(0, 4).map(p => ({ ...p, catLabel: label(cat) })),
  }))
)

// Vista filtrada
const filtered = computed(() =>
  byCategory(activeCategory.value).map(p => ({
    ...p,
    catLabel: label(activeCategory.value),
  }))
)

function enrich(p) {
  return { ...p, catLabel: label(p.category) }
}
</script>

<template>
  <section class="gallery-page">
    <div class="gallery-header">
      <p class="eyebrow">Portfólio</p>
      <h2>Galerias</h2>
      <p class="gallery-desc">Cada categoria conta uma história diferente. Explore a coleção.</p>
    </div>

    <!-- Filtros -->
    <div class="filter-tabs" role="tablist">
      <button
        v-for="cat in categories"
        :key="cat.id"
        role="tab"
        :aria-selected="activeCategory === cat.id"
        :class="{ active: activeCategory === cat.id }"
        @click="activeCategory = cat.id"
      >{{ cat.name }}</button>
    </div>

    <!-- Vista: todas (por seção) -->
    <template v-if="activeCategory === 'all'">
      <div v-for="section in sections" :key="section.id" class="gallery-section">
        <div class="section-row">
          <h3>{{ section.name }}</h3>
          <button class="see-all" @click="activeCategory = section.id">
            Ver todas
            <!-- Seta customizada — linha limpa sem ponta genérica -->
            <svg viewBox="0 0 16 10" fill="none">
              <line x1="0" y1="5" x2="13" y2="5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <path d="M9 1 L13 5 L9 9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="gallery-grid">
          <Card
            v-for="photo in section.photos"
            :key="photo.id"
            :photo="photo"
            @open="$emit('open-photo', photo)"
          />
        </div>
      </div>
    </template>

    <!-- Vista: filtrada -->
    <template v-else>
      <div class="gallery-grid wide">
        <Card
          v-for="photo in filtered"
          :key="photo.id"
          :photo="photo"
          @open="$emit('open-photo', photo)"
        />
      </div>
    </template>
  </section>
</template>

<style scoped lang="scss">
.gallery-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;
}

.gallery-header {
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
    margin-bottom: 0.6rem;
  }

  .gallery-desc {
    font-size: 0.9rem;
    color: var(--subtle);
    max-width: 380px;
    line-height: 1.65;
  }
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 3rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);

  button {
    background: none;
    border: 1px solid transparent;
    padding: 0.4rem 1.1rem;
    border-radius: 100px;
    font-size: 0.82rem;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s;

    &:hover { color: var(--ink); border-color: var(--border); }
    &.active { background: var(--ink); color: white; }
  }
}

.gallery-section { margin-bottom: 4rem; &:last-child { margin-bottom: 0; } }

.section-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.1rem;

  h3 {
    font-family: 'Georgia', serif;
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--ink);
  }
}

.see-all {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  font-size: 0.78rem;
  color: var(--subtle);
  cursor: pointer;
  transition: color 0.2s;

  svg { width: 14px; height: 9px; }
  &:hover { color: var(--accent); }
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  &.wide { grid-template-columns: repeat(4, 1fr); }
}

@media (max-width: 1200px) { .gallery-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
  .gallery-page { padding: 3rem 1rem 4rem; }
  .gallery-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
}
</style>