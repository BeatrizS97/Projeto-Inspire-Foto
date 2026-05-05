export const Photos = [
  { id: 'p1', seed: 'mountains1', title: 'Picos gelados',       category: 'paisagens' },
  { id: 'p2', seed: 'valley2',    title: 'Vale enevoado',       category: 'paisagens' },
  { id: 'p3', seed: 'sunset3',    title: 'Horizonte dourado',   category: 'paisagens' },
  { id: 'p4', seed: 'coast4',     title: 'Costa rochosa',       category: 'paisagens' },
  { id: 'p5', seed: 'lake5',      title: 'Lago espelhado',      category: 'paisagens' },
  { id: 'p6', seed: 'desert6',    title: 'Mar de areia',        category: 'paisagens' },

  { id: 'e1', seed: 'event1',     title: 'Instante único',      category: 'eventos'   },
  { id: 'e2', seed: 'event2',     title: 'Celebração',          category: 'eventos'   },
  { id: 'e3', seed: 'event3',     title: 'Movimento',           category: 'eventos'   },
  { id: 'e4', seed: 'event4',     title: 'Emoção capturada',    category: 'eventos'   },

  { id: 'r1', seed: 'portrait1',  title: 'Olhar distante',      category: 'retratos'  },
  { id: 'r2', seed: 'portrait2',  title: 'Luz natural',         category: 'retratos'  },
  { id: 'r3', seed: 'portrait3',  title: 'Silhueta',            category: 'retratos'  },
  { id: 'r4', seed: 'portrait4',  title: 'Expressão',           category: 'retratos'  },

  { id: 'u1', seed: 'urban1',     title: 'Labirinto de concreto', category: 'urbano'  },
  { id: 'u2', seed: 'urban2',     title: 'Geometria urbana',    category: 'urbano'    },
  { id: 'u3', seed: 'urban3',     title: 'Luzes da cidade',     category: 'urbano'    },
  { id: 'u4', seed: 'urban4',     title: 'Movimento nas ruas',  category: 'urbano'    },

  { id: 'n1', seed: 'nature1',    title: 'Raízes antigas',      category: 'natureza'  },
  { id: 'n2', seed: 'nature2',    title: 'Floresta úmida',      category: 'natureza'  },
  { id: 'n3', seed: 'nature3',    title: 'Fauna silvestre',     category: 'natureza'  },
  { id: 'n4', seed: 'nature4',    title: 'Micro mundo',         category: 'natureza'  },
  { id: 'n5', seed: 'nature5',    title: 'Cascata viva',        category: 'natureza'  },
  { id: 'n6', seed: 'nature6',    title: 'Campos abertos',      category: 'natureza'  },

  { id: 'h1', seed: 'forest2',   title: 'Névoa entre pinheiros', category: 'natureza' },
  { id: 'h2', seed: 'ocean3',    title: 'Horizonte infinito',    category: 'paisagens' },
  { id: 'h3', seed: 'desert4',   title: 'Dunas douradas',        category: 'paisagens' },
  { id: 'h4', seed: 'peak6',     title: 'Cume gelado',           category: 'paisagens' },
  { id: 'h5', seed: 'valley7',   title: 'Vale escondido',        category: 'paisagens' },
  { id: 'h6', seed: 'coast8',    title: 'Falésia ao entardecer', category: 'paisagens' },
]

// Mapeamento de categorias para rótulos legíveis
export const category_labels ={
    paisagens: 'Paisagens',
    eventos: 'Eventos',
    retratos: 'Retratos',
    urbano: 'Urbano',
    natureza: 'Natureza',
}

export function photoUrl(seed, w = 600, h = 800) {
      return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

export const features_id = ['h1','h2','h3','h4','h5','h6','p1','p2']


export function usePhotos() {
    function byCategory(category) {
        return Photos.filter(photo => photo.category === category)
    }

    function byId(id) {
        return Photos.find(photo => photo.id === id) ?? null
    }

    function featured() {
        return features_id.map(id => byId(id)).filter(Boolean)
    }

    function label(category) {
        return category_labels[category] ?? category
    }

    return {
        photos: Photos,
        byCategory,
        byId,
        featured,
        label,
        photoUrl,
    }
}

