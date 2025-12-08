<script setup>
import logo from "../assets/logo.png";
import pessoa from "../assets/pessoa.png";
import pesquisa from "../assets/pesquisa.png";
</script>

<template>
  <header>
    <img :src="logo" alt="Logo" class="logo" />
    <nav>
      <ul>
        <li class="search-icon">
          <a href="#">
            <img :src="pesquisa" alt="Search" />
          </a>
        </li>
        <li><a href="#">Início</a></li>
        <li><a href="#">Galerias</a></li>
        <li><a href="#">Favoritos</a></li>
        <li class="profile-icon">
          <a href="#">
            <img :src="pessoa" alt="Profile" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  flex-wrap: wrap;
  gap: 1rem;

  .logo {
    height: 40px;
    width: auto;
  }

  nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    align-items: center;
    margin: 0;
    padding: 0;
    flex-wrap: wrap;

    li {
      a {
        text-decoration: none;
        color: #333;
        font-size: 1rem;
        font-weight: 400;
        transition: color 0.3s;

        &:hover {
          color: #e1306c;
        }

        img {
          height: 24px;
          width: 24px;
          display: block;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  header {
    padding: 1rem;
    justify-content: center;

    .logo {
      height: 35px;
    }

    nav ul {
      gap: 1.5rem;
      font-size: 0.9rem;
    }
  }
}
@media (max-width: 480px) {
  header {
    flex-direction: column;
    gap: 1.5rem;

    nav ul {
      gap: 1rem;
      justify-content: center;
    }
  }
}
</style>
