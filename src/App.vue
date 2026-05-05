<script setup>
import { ref } from 'vue';
import Banner from './components/Banner.vue';
import Header from './components/Header.vue';
import Inspire from './components/Inspire.vue';
import Gallery   from './components/Gallery.vue'
import Favorites from './components/Favorites.vue'
import Footer    from './components/Footer.vue'
import PhotoModal from './components/PhotoModal.vue'

const currentPage = ref('home');

function navigate(page) {
  currentPage.value = page;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

const selectedPhoto = ref(null);

function openPhoto(photo) {
  selectedPhoto.value = photo;
}

function closePhoto() {
  selectedPhoto.value = null;
}
</script>

<template>
  <div id="app">
    <Header :current-page="currentPage" @navigate="navigate" />
    
    <main>
      <template v-if="currentPage === 'home'">
        <Banner @navigate="navigate" />
        <Inspire @open-photo="openPhoto" />
      </template>

      <Gallery
        v-else-if="currentPage === 'gallery'"
        @open-photo="openPhoto"
      />

      <Favorites
        v-else-if="currentPage === 'favorites'"
        @open-photo="openPhoto"
      />
    </main>
    <Footer />

    <PhotoModal
      v-if="selectedPhoto"
      :photo="selectedPhoto"
      @close="closePhoto"
    />

  </div>
</template>

<style lang="scss">
*, *::before, *::after {
  margin: 0; padding: 0; box-sizing: border-box;
}
 
:root {
  --accent:   #E1306C;
  --accent-dk:#c1285c;
  --ink:      #1a1a1a;
  --muted:    #666;
  --subtle:   #999;
  --border:   rgba(0,0,0,0.08);
  --surface:  #f8f8f8;
}
 
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #fff;
  color: var(--ink);
  line-height: 1.6;
}
 
#app { min-height: 100vh; overflow-x: hidden; }
a    { text-decoration: none; color: inherit; }
img  { max-width: 100%; height: auto; display: block; }
button { font-family: inherit; cursor: pointer; }
 
::-webkit-scrollbar       { width: 5px; }
::-webkit-scrollbar-track { background: #f0f0f0; }
::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }
</style>