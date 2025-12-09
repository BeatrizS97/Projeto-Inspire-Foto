<script setup>
import Card from "./Card.vue";
import { ref, onMounted } from "vue";

const imagens = ref([]);
const loading = ref(true);

// Função para embaralhar array (Fisher-Yates)
function embaralhar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function carregarImagens() {
  // IDs oficiais do Picsum que são 100% paisagens naturais e sempre funcionam
  const idsDePaisagens = [
    0, 1, 2, 3, 4, 5, 7, 8, 10, 11,
    12, 14, 15, 16, 18, 19, 20, 21, 22, 23,
    25, 26, 27, 28, 30, 31, 32, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 42, 43, 44, 45
  ];

  // Embaralha e pega 12 imagens diferentes a cada vez
  const selecionadas = embaralhar(idsDePaisagens).slice(0, 12);

  imagens.value = selecionadas.map((id, index) => ({
    id: index + 1,
    download_url: `https://picsum.photos/id/${id}/600/800?gravity=center`,
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
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 1200px) {
  .inspire-section {
    .inspire-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 1.2rem;
    }

    h2 {
      font-size: 2.2rem;
    }
  }
}

@media (max-width: 768px) {
  .inspire-section {
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

    h2 {
      font-size: 1.5rem;
    }

    .inspire-grid {
      grid-template-columns: 1fr;
      gap: 1rem;
    }
  }
}
</style>