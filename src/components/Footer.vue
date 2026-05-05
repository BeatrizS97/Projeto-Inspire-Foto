<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (!email.value) return
  subscribed.value = true
  email.value = ''
  setTimeout(() => subscribed.value = false, 4000)
}
</script>

<template>
  <footer class="site-footer">
    <div class="footer-inner">

      <!-- Brand -->
      <div class="footer-brand">
        <div class="brand-logo">
          <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.9"/>
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.7" transform="rotate(60 20 20)"/>
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#E1306C" opacity="0.5" transform="rotate(120 20 20)"/>
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#c1285c" opacity="0.9" transform="rotate(180 20 20)"/>
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#c1285c" opacity="0.7" transform="rotate(240 20 20)"/>
            <path d="M20 4 C24 4 27 8 26 13 L20 20 L14 13 C13 8 16 4 20 4Z" fill="#c1285c" opacity="0.5" transform="rotate(300 20 20)"/>
            <circle cx="20" cy="20" r="4" fill="white"/>
            <circle cx="20" cy="20" r="2" fill="#E1306C"/>
          </svg>
          <span>inspire<em>foto</em></span>
        </div>
        <p class="brand-desc">
          Capturando a alma dos lugares<br/>através da fotografia de paisagem.
        </p>

        <!--
          Ícones de redes sociais: desenhados com o mesmo traço (stroke-width 1.3,
          stroke-linecap round) — coerentes entre si e com o restante do sistema.
          Representam a FORMA da plataforma sem copiar logos registrados.
        -->
        <div class="social-row">
          <!-- Instagram: câmera quadrada arredondada + lente -->
          <a href="#" aria-label="Instagram" class="social-link">
            <svg viewBox="0 0 20 20" fill="none">
              <rect x="3" y="3" width="14" height="14" rx="4" stroke="currentColor" stroke-width="1.3"/>
              <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.3"/>
              <circle cx="14.5" cy="5.5" r="1" fill="currentColor"/>
            </svg>
          </a>
          <!-- Pinterest: letra P estilizada com alfinete -->
          <a href="#" aria-label="Pinterest" class="social-link">
            <svg viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.3"/>
              <path d="M8 16 C8 13 9 11 9 11 C8.5 10 8 9 8 8 C8 6.5 9 5.5 10.5 5.5 C12 5.5 12.5 6.5 12.5 7.5 C12.5 9 11.5 11 11.5 12.5 C11.5 13.5 12.5 14 13.5 13.5"
                stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
            </svg>
          </a>
          <!-- Behance: duas letras B sobrepostas simplificadas -->
          <a href="#" aria-label="Behance" class="social-link">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="M4 6 L4 14 M4 6 L8 6 C9.5 6 10.5 7 10.5 8 C10.5 9 9.5 10 8 10 C9.7 10 11 11 11 12.5 C11 14 9.7 14.5 8 14.5 L4 14.5"
                stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M13 10.5 L17 10.5 C17 8.5 16 7.5 14.5 7.5 C13 7.5 12 8.5 12 10.5 C12 12.5 13 13.5 15 13.5 C16 13.5 16.5 13 17 12.5"
                stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
              <line x1="13.5" y1="6" x2="16.5" y2="6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Links -->
      <nav class="footer-nav">
        <div class="nav-col">
          <h4>Navegação</h4>
          <ul>
            <li><a href="#">Início</a></li>
            <li><a href="#">Galerias</a></li>
            <li><a href="#">Favoritos</a></li>
            <li><a href="#">Sobre</a></li>
          </ul>
        </div>

        <div class="nav-col">
          <h4>Categorias</h4>
          <ul>
            <li><a href="#">Paisagens</a></li>
            <li><a href="#">Eventos</a></li>
            <li><a href="#">Retratos</a></li>
            <li><a href="#">Urbano</a></li>
            <li><a href="#">Natureza</a></li>
          </ul>
        </div>

        <div class="nav-col newsletter-col">
          <h4>Newsletter</h4>
          <p class="newsletter-hint">Novos frames na sua caixa de entrada.</p>
          <form @submit.prevent="subscribe" class="newsletter-form">
            <input
              v-model="email"
              type="email"
              placeholder="seu@email.com"
              required
            />
            <!-- Seta de envio: coerente com o sistema -->
            <button type="submit" aria-label="Inscrever">
              <svg v-if="!subscribed" viewBox="0 0 16 10" fill="none">
                <line x1="0" y1="5" x2="13" y2="5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                <path d="M9 1 L13 5 L9 9" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <!-- Check de confirmação -->
              <svg v-else viewBox="0 0 14 14" fill="none">
                <path d="M2 7 L5.5 10.5 L12 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </form>
          <p v-if="subscribed" class="success">Inscrito ✓</p>
        </div>
      </nav>
    </div>

    <!-- Bottom bar -->
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <p class="copyright">© 2024 InspireFoto — Todos os direitos reservados.</p>
        <div class="legal">
          <a href="#">Privacidade</a>
          <span aria-hidden="true">·</span>
          <a href="#">Termos</a>
          <span aria-hidden="true">·</span>
          <a href="#">Licenças</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.site-footer {
  background: #0f0f0f;
  color: rgba(255,255,255,0.65);
  margin-top: 6rem;
}

.footer-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem 3rem;
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 5rem;
  border-bottom: 1px solid rgba(255,255,255,0.07);
}

/* Brand */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.55rem;

  span {
    font-family: 'Georgia', serif;
    font-size: 1.15rem;
    color: white;
    em { font-style: italic; color: #E1306C; }
  }
}

.brand-desc {
  font-size: 0.82rem;
  line-height: 1.75;
  color: rgba(255,255,255,0.35);
}

.social-row {
  display: flex;
  gap: 0.5rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 7px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.4);
  transition: all 0.2s;

  svg { width: 16px; height: 16px; }
  &:hover {
    background: rgba(225,48,108,0.12);
    border-color: rgba(225,48,108,0.25);
    color: #E1306C;
  }
}

/* Nav */
.footer-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.nav-col {
  h4 {
    font-size: 0.66rem;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: rgba(255,255,255,0.25);
    margin-bottom: 1.1rem;
    font-weight: 500;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;

    a {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.45);
      transition: color 0.2s;
      &:hover { color: white; }
    }
  }

  &.newsletter-col {
    .newsletter-hint {
      font-size: 0.78rem;
      color: rgba(255,255,255,0.28);
      line-height: 1.6;
      margin-bottom: 0.9rem;
    }
  }
}

.newsletter-form {
  display: flex;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 7px;
  overflow: hidden;
  transition: border-color 0.2s;

  &:focus-within { border-color: rgba(225,48,108,0.35); }

  input {
    flex: 1;
    background: none;
    border: none;
    padding: 0.65rem 0.9rem;
    font-size: 0.8rem;
    color: white;
    outline: none;
    min-width: 0;

    &::placeholder { color: rgba(255,255,255,0.22); }
  }

  button {
    background: #E1306C;
    border: none;
    padding: 0 0.85rem;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    flex-shrink: 0;

    svg { width: 13px; }
    &:hover { background: #c1285c; }
  }
}

.success {
  font-size: 0.72rem;
  color: #81c784;
  margin-top: 0.5rem;
}

/* Bottom */
.footer-bottom {
  background: rgba(0,0,0,0.3);
}

.footer-bottom-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.25rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.copyright {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.18);
}

.legal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.15);

  a {
    color: rgba(255,255,255,0.3);
    transition: color 0.2s;
    &:hover { color: rgba(255,255,255,0.65); }
  }
}

@media (max-width: 1024px) {
  .footer-inner { grid-template-columns: 1fr; gap: 3rem; }
}
@media (max-width: 768px) {
  .footer-inner  { padding: 3rem 1.5rem 2.5rem; }
  .footer-nav    { grid-template-columns: repeat(2, 1fr); }
  .footer-bottom-inner { flex-direction: column; align-items: flex-start; }
}
@media (max-width: 480px) {
  .footer-nav { grid-template-columns: 1fr; }
}
</style>