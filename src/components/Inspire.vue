<script setup>
import Card from './Card.vue'
import { usePhotos } from '../composables/usePhotos'

const emit = defineEmits(['open-photo'])

const { featured, label, photoUrl } = usePhotos()

// Enriquece cada foto com o rótulo legível da categoria
const photos = featured().map(p => ({
  ...p,
  catLabel: label(p.category),
}))
</script>

<template>
  <section class="inspire-section">
    <div class="section-header">
      <div>
        <p class="eyebrow">Destaques</p>
        <h2>Inspire-se</h2>
      </div>
      <p class="section-desc">
        Uma seleção de frames que capturam a essência de cada lugar.
      </p>
    </div>

    <div class="inspire-grid">
      <Card
        v-for="photo in photos"
        :key="photo.id"
        :photo="photo"
        @open="$emit('open-photo', photo)"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
.inspire-section {
  padding: 4rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  gap: 2rem;

  .eyebrow {
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: var(--accent);
    margin-bottom: 0.4rem;
  }

  h2 {
    font-family: 'Georgia', serif;
    font-size: 2.1rem;
    font-weight: 400;
    color: var(--ink);
  }

  .section-desc {
    font-size: 0.88rem;
    color: var(--subtle);
    max-width: 260px;
    text-align: right;
    line-height: 1.65;
  }
}

.inspire-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.1rem;
}

@media (max-width: 1200px) { .inspire-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) {
  .inspire-section { padding: 3rem 1rem; }
  .section-header  { flex-direction: column; align-items: flex-start; }
  .section-header .section-desc { text-align: left; max-width: 100%; }
  .inspire-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
}
@media (max-width: 480px) { .inspire-grid { grid-template-columns: 1fr; } }
</style>