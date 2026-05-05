// Serve para gerenciar os favoritos do usuário de forma isolada
// Persiste em localStorage para manter os favoritos entre sessões

import { ref, watch } from 'vue'

const storage_key = 'inspirefoto:favorites'

function load() {
    try {
        return JSON.parse(localStorage.getItem(storage_key) ?? '[]')
    } catch {
        return []
    }
}

const favorites = ref(load())

watch(favorites, value => {
    localStorage.setItem(storage_key, JSON.stringify(value))
}, { deep: true })

export function useFavorites() {
    function isFavorite(id) {
        return favorites.value.includes(id) 
    }

    function toggle(id) {
        const index = favorites.value.indexOf(id)
        if (index === -1) {
            favorites.value.push(id)
        } else {
            favorites.value.splice(index, 1)
        }
    }

    function count () {
        return favorites.value.length
    }

    return {
        favorites,
        isFavorite,
        toggle,
        count,
    }
}