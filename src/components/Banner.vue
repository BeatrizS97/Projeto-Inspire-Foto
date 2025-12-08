<script setup>
import fotografo from "../assets/fotografo.png";
</script>

<template>
  <section class="banner">
    <div class="banner-content">
      <h1>
        Onde a paisagem<br />
        vira <span>inspiração</span>.
      </h1>
      <p>
        Explore paisagens, cores e luzes que inspiram novas histórias através da fotografia.
      </p>
    </div>
    <div class="banner-image">
      <img :src="fotografo" alt="Fotógrafo" />
    </div>
  </section>
</template>

<style scoped lang="scss">
.banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto;

  .banner-content {
    flex: 1;
    max-width: 600px;

    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin: 0 0 1.5rem 0;
      color: #1a1a1a;

      span {
        color: #e1306c;
        font-size: 4.5rem;
        font-weight: 800;
      }
    }

    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #555;
      margin: 0;
      max-width: 500px;
    }
  }

  .banner-image {
    flex: 1;
    display: flex;
    justify-content: flex-end;

    img {
      width: 100%;
      max-width: 500px;
      height: auto;
      border-radius: 80px;
      object-fit: cover;
    }
  }
}

@media (max-width: 1024px) {
  .banner {
    padding: 2rem 1.5rem;

    .banner-content {
      h1 {
        font-size: 2.8rem;

        span {
          font-size: 3.5rem;
        }
      }

      p {
        font-size: 1rem;
      }
    }

    .banner-image img {
      max-width: 400px;
    }
  }
}

@media (max-width: 768px) {
  .banner {
    flex-direction: column;
    padding: 2rem 1rem;
    text-align: center;

    .banner-content {
      max-width: 100%;

      h1 {
        font-size: 2.2rem;

        span {
          font-size: 2.8rem;
        }
      }

      p {
        max-width: 100%;
      }
    }

    .banner-image {
      justify-content: center;
      width: 100%;

      img {
        max-width: 350px;
        border-radius: 60px;
      }
    }
  }
}

@media (max-width: 480px) {
  .banner {
    .banner-content {
      h1 {
        font-size: 1.8rem;

        span {
          font-size: 2.2rem;
        }
      }

      p {
        font-size: 0.95rem;
      }
    }

    .banner-image img {
      max-width: 280px;
      border-radius: 50px;
    }
  }
}
</style>