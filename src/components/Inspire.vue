<script setup>
import Card from "./Card.vue";
import { ref, onMounted } from "vue";

const imagens = ref([]);
const loading = ref(true);

function carregarImagens() {
  // Gera 12 seeds aleatórios para garantir variedade
  const seeds = Array.from({ length: 12 }, (_, i) => Math.floor(Math.random() * 1000) + i);

  imagens.value = seeds.map((seed, index) => ({
    id: index + 1,
    // Usa seed + parâmetro 'gravity=center' para focar no centro
    download_url: `https://picsum.photos/seed/${seed}/600/800?gravity=center`,
  }));

  loading.value = false;
}

onMounted(() => {
  carregarImagens();
});
</script>

<template>
  <section class="inspire-section">
    <h2>Inspire-se</h2>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Carregando paisagens inspiradoras...</p>
    </div>

    <div v-else class="inspire-grid">
      <Card
        v-for="img in imagens"
        :key="img.id"
        :imagem="img.download_url"
      />
    </div>
  </section>
</template>

<style scoped lang="scss">
/* Seu CSS permanece exatamente igual */
.inspire-section {
  padding: 3rem 2rem;
  max-width: 1400px;
  margin: 0 auto;

  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0 0 2rem 0;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 0;
    gap: 1rem;

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #e1306c;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    p {
      color: #666;
      font-size: 1.1rem;
    }
  }

  .inspire-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 1200px) {
  .inspire-section {
    .inspire-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.2rem;
    }
    h2 { font-size: 2.2rem; }
  }
}

@media (max-width: 768px) {
  .insire-section {
    padding: 2rem 1rem;
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
    }
    .inspire-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
    }
  }
}

@media (max-width: 480px) {
  .inspire-section {
    padding: 1.5rem 1rem;
    h2 { font-size: 1.5rem; }
    .inspire-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
}
</style>