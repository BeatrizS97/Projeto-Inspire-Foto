```markdown
# 📸 InspireFoto

> _"Onde a luz encontra a alma do lugar."_

<p align="center">
  <img src="https://img.shields.io/badge/Vue_3-Composition_API-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-Next_Gen_Build-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/SCSS-Powered-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS" />
  <img src="https://img.shields.io/badge/Mobile_First-Responsive-007ACC?style=for-the-badge" alt="Mobile First" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 🎯 Visão Geral

**InspireFoto** é uma aplicação web moderna desenvolvida com **Vue 3** para explorar e curar fotografias de paisagens com uma experiência visual editorial. O projeto combina arquitetura escalável, design system consistente e UX refinada para entregar uma galeria que inspira.

✨ **Destaques:**
- 🎨 Design editorial com ícones SVG customizados e tipografia Georgia
- 🔄 Estado global reativo via Composables (`useFavorites`, `usePhotos`)
- 💾 Persistência em `localStorage` para favoritos entre sessões
- ♿ Acessibilidade: ARIA labels, navegação por teclado e foco visível
- 📱 Responsividade mobile-first com breakpoints refinados
- 🌙 Footer em tema escuro com newsletter reativa e feedback visual

---

## ✨ Funcionalidades

### 🖼️ Galeria & Navegação
- [x] Navegação por abas com estados ativos e transições suaves
- [x] Filtros por categoria: Paisagens, Eventos, Retratos, Urbano, Natureza
- [x] Vista "Todas" com seções curadas + vista filtrada em grid completo
- [x] Modal de visualização com `Teleport`, overlay e painel lateral de metadados

### ❤️ Sistema de Favoritos
- [x] Toggle reativo com ícone de losango/diafragma (estilo editorial)
- [x] Persistência automática em `localStorage` com chave `inspirefoto:favorites`
- [x] Badge dinâmico no Header com contagem em tempo real
- [x] Página dedicada "Favoritos" com estado vazio personalizado

### 🎨 Design System
- [x] Variáveis CSS centralizadas: `--accent`, `--ink`, `--muted`, `--border`, `--surface`
- [x] Ícones SVG com `stroke-width: 1.3/1.4/1.5` e `stroke-linecap: round` para consistência
- [x] Tipografia: Georgia para títulos, system fonts para corpo
- [x] Animações: `fadeIn`, `rise`, hover states e transições de 200-550ms

### ⚙️ Arquitetura & Performance
- [x] Composables isolados: lógica de dados (`usePhotos`) e estado (`useFavorites`)
- [x] Componentes reutilizáveis: `Card`, `PhotoModal`, `Banner` com props tipadas
- [x] Proteção de imagem: `@dragstart.prevent`, `@contextmenu.prevent`, `.shield`
- [x] Fallback de imagem confiável via `onError` com seed fixo

---

## 🛠️ Stack Tecnológica

| Categoria | Tecnologia |
|-----------|-----------|
| **Framework** | Vue 3.4+ (Composition API, `<script setup>`) |
| **Build** | Vite 5 (HMR, optimized build) |
| **Estilos** | SCSS Modules + CSS Variables |
| **Ícones** | SVG inline customizados (sem bibliotecas externas) |
| **Persistência** | localStorage com tratamento seguro (`try/catch`) |
| **Imagens** | Picsum Photos API com seeds para consistência |
| **Acessibilidade** | ARIA labels, roles, navegação por teclado |

---

## 📦 Estrutura do Projeto

```
inspire-fotos/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── (fonts, imagens estáticas se necessário)
│   ├── composables/
│   │   ├── useFavorites.js    # Lógica de favoritos + localStorage
│   │   └── usePhotos.js       # Catálogo, filtros e utilitários de imagem
│   ├── components/
│   │   ├── Banner.vue         # Hero section com CTA e stats
│   │   ├── Card.vue           # Photo card com overlay, fav e proteção
│   │   ├── Favorites.vue      # Página de coleção pessoal
│   │   ├── Footer.vue         # Rodapé dark com newsletter e links
│   │   ├── Gallery.vue        # Galeria com filtros e grid responsivo
│   │   ├── Header.vue         # Navegação sticky com menu mobile
│   │   ├── Inspire.vue        # Seção de destaques curados
│   │   └── PhotoModal.vue     # Modal de visualização com painel
│   ├── styles/
│   │   ├── variables.scss     # CSS variables do design system
│   │   ├── mixins.scss        # Mixins reutilizáveis de SCSS
│   │   └── style.css          # Reset e estilos globais
│   ├── App.vue                # Layout principal com roteamento por estado
│   └── main.js                # Entry point da aplicação
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js ≥ 16.x
- npm ≥ 8.x ou yarn ≥ 1.22.x

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/inspire-fotos.git

# Acesse a pasta do projeto
cd inspire-fotos

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

🌐 O projeto estará disponível em `http://localhost:5173`

### Build para Produção
```bash
# Gere o build otimizado
npm run build
# ou
yarn build

# Visualize localmente o build
npm run preview
# ou
yarn preview
```

---

## 📱 Breakpoints de Responsividade

| Dispositivo | Largura | Layout |
|-------------|---------|--------|
| **Desktop** | ≥ 1200px | Grid 4 colunas, navegação completa |
| **Tablet**  | 768px – 1199px | Grid 3 colunas, menu adaptado |
| **Mobile L** | 480px – 767px | Grid 2 colunas, menu hambúrguer |
| **Mobile S** | < 480px | Grid 1 coluna, toque otimizado |

> ✅ Sem scroll horizontal • Toque-friendly • Fontes e botões dimensionados para mobile

---

## 🎨 Design System

### Paleta de Cores
```scss
:root {
  --accent:   #E1306C;  /* Rosa/Magenta - ação e destaque */
  --accent-dk:#c1285c;  /* Hover states */
  --ink:      #1a1a1a;  /* Texto principal */
  --muted:    #666;     /* Texto secundário */
  --subtle:   #999;     /* Texto terciário */
  --border:   rgba(0,0,0,0.08);
  --surface:  #f8f8f8;  /* Fundos alternativos */
}
```

### Tipografia
```scss
/* Títulos e marca */
font-family: 'Georgia', 'Times New Roman', serif;

/* Corpo e UI */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif;
```

### Ícones Customizados
Todos os ícones seguem o padrão editorial:
- `stroke-width`: 1.3 / 1.4 / 1.5 (conforme contexto)
- `stroke-linecap: round` para pontas suaves
- Geometria minimalista (losango, diafragma, lente)
- Sem dependência de bibliotecas externas

---

## 🧩 Arquitetura de Dados

### Composables

#### `useFavorites()`
```js
const { favorites, isFavorite, toggle, count } = useFavorites()
```
- `favorites`: ref reativo com array de IDs
- `isFavorite(id)`: verifica se foto está salva
- `toggle(id)`: adiciona/remove com persistência automática
- `count()`: retorna total de favoritos

#### `usePhotos()`
```js
const { photos, byCategory, byId, featured, label, photoUrl } = usePhotos()
```
- `photos`: array completo de fotos com metadados
- `byCategory(cat)`: filtra por categoria
- `byId(id)`: busca foto por ID com fallback seguro
- `featured()`: retorna curadoria para seção "Inspire-se"
- `label(cat)`: retorna rótulo legível da categoria
- `photoUrl(seed, w, h)`: gera URL otimizada do Picsum

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! 🙌

```bash
# 1. Fork o projeto
# 2. Crie uma branch para sua feature
git checkout -b feat/minha-nova-feature

# 3. Commit seguindo o padrão
git commit -m "feat(componente): descrição clara da mudança"

# 4. Push e abra um Pull Request
git push origin feat/minha-nova-feature
```

### Padrão de Commits
```
feat(scope): descrição da nova funcionalidade
fix(scope): correção de bug
refactor(scope): melhoria de código sem mudar comportamento
docs(scope): atualização de documentação
style(scope): ajustes de estilo/visual
chore(scope): tarefas de manutenção
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para usar, modificar e distribuir.

```
MIT License
Copyright (c) 2024 InspireFoto
```

---

## 👨‍💻 Autor

Desenvolvido com ❤️ e café por **Beatriz Silva**

> *"Cada frame é uma história silenciosa — explorada, sentida e preservada através da lente de quem enxerga o mundo diferente."*

<p align="center">
  <sup>⭐ Se este projeto te inspirou, considere dar uma estrela! Sua apoio motiva a evolução contínua.</sup>
</p>
```