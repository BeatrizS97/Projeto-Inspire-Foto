<script setup>
import Card from "./Card.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const imagens = ref([]);
const loading = ref(true);
const erro = ref(null);
async function carregarImagens() {
  try {
    loading.value = true;

    // Chama o proxy local (sem chave no frontend!)
    const res = await axios.get("/api/unsplash", {
      params: {
        query: "landscape",
        orientation: "landscape",
        per_page: 12,
        page: Math.floor(Math.random() * 10) + 1, // varia as imagens
      },
    });

   imagens.value = res.data.results
  .filter(photo => photo.urls && photo.urls.regular) // só inclui se urls.regular existir
  .map(photo => ({
    id: photo.id,
    download_url: photo.urls.regular,
  }));
  
  } catch (error) {
    erro.value = "Erro ao carregar paisagens. Tente novamente.";
    console.error("Erro na API:", error);
  } finally {
    loading.value = false;
  }
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

    <div v-else-if="erro" class="erro">
      <p>{{ erro }}</p>
      <button @click="carregarImagens">Tentar novamente</button>
    </div>

    <div v-else class="inspire-grid">
      <Card
        v-for="(img, index) in imagens"
        :key="img.id || index"
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

  .erro {
    text-align: center;
    padding: 3rem 0;

    p {
      color: #d32f2f;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    button {
      background: #e1306c;
      color: white;
      border: none;
      padding: 0.8rem 2rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.3s;

      &:hover {
        background: #c1285c;
      }
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
