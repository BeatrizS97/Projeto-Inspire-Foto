// src/composables/useBannerCarousel.js
import { ref, computed, onMounted, onUnmounted } from 'vue'

const images = [
  { seed: 'banner1', alt: 'Paisagem ensolarada com vegetação' },
  { seed: 'banner2', alt: 'Cenário natural com luz dourada' },
  { seed: 'banner15', alt: 'Cidade em destaque' },
  { seed: 'banner4', alt: 'Fotografia de paisagem' },
]

const AUTO_PLAY_INTERVAL = 5000 // 5 segundos

export function useBannerCarousel() {
  const currentIndex = ref(0)
  const isHovering = ref(false)
  let autoPlayTimer = null

  const currentImage = computed(() => images[currentIndex.value])
  const nextIndex = computed(() => (currentIndex.value + 1) % images.length)
  const nextImage = computed(() => images[nextIndex.value])

  function next() {
    currentIndex.value = (currentIndex.value + 1) % images.length
  }

  function prev() {
    currentIndex.value = currentIndex.value === 0 
      ? images.length - 1 
      : currentIndex.value - 1
  }

  function startAutoPlay() {
    stopAutoPlay()
    autoPlayTimer = setInterval(() => {
      next()
    }, AUTO_PLAY_INTERVAL)
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer)
      autoPlayTimer = null
    }
  }

  function onMouseEnter() {
    isHovering.value = true
    stopAutoPlay()
  }

  function onMouseLeave() {
    isHovering.value = false
    startAutoPlay()
  }

  onMounted(() => {
    startAutoPlay()
  })

  onUnmounted(() => {
    stopAutoPlay()
  })

  return {
    images,
    currentIndex,
    currentImage,
    nextImage,
    isHovering,
    next,
    prev,
    onMouseEnter,
    onMouseLeave,
  }
}