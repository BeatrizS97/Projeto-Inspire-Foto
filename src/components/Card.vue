<script setup>
import { ref } from "vue";

const props = defineProps({
  imagem: String,
});

const favorito = ref(false);

function toggleFavorito() {
  favorito.value = !favorito.value;
}

// Função de fallback: substitui imagem quebrada por uma padrão confiável
function usarImagemDeFallback(event) {
  event.target.src = "https://picsum.photos/id/0/600/800?gravity=center";
}
</script>

<template>
  <div class="card">
    <img 
      :src="imagem" 
      :alt="'Paisagem'" 
      class="card-image"
      @error="usarImagemDeFallback"
    />
    <button 
      @click="toggleFavorito" 
      class="favorite-btn"
      :class="{ active: favorito }"
      aria-label="Adicionar aos favoritos"
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" 
          :fill="favorito ? '#E1306C' : 'white'"
          stroke="#E1306C"
          stroke-width="1.5"
        />
      </svg>
    </button>
  </div>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
  aspect-ratio: 3/4;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);

    .favorite-btn {
      opacity: 1;
    }
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .favorite-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(8px);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 2;

    &:hover {
      background: rgba(255, 255, 255, 0.5);
      transform: scale(1.1);
    }

    &.active {
      opacity: 1;
      background: rgba(255, 255, 255, 0.5);
    }

    svg {
      width: 22px;
      height: 22px;
    }
  }
}

@media (max-width: 768px) {
  .card {
    aspect-ratio: 1/1;

    .favorite-btn {
      opacity: 1;
      width: 36px;
      height: 36px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>