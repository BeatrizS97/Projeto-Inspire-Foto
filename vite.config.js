// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { readFileSync } from 'fs';
import { join } from 'path';

// Lê a Access Key do arquivo .env (sem expor no frontend)
function getUnsplashAccessKey() {
  try {
    const envPath = join(__dirname, '.env');
    const envContent = readFileSync(envPath, 'utf8');
    const keyLine = envContent
      .split('\n')
      .find(line => line.trim().startsWith('UNSPLASH_ACCESS_KEY='));
    if (keyLine) {
      return keyLine.split('=')[1].trim();
    }
  } catch (error) {
    console.warn('⚠️ .env não encontrado ou chave ausente. Proxy da Unsplash desativado.');
  }
  return '';
}

const UNSPLASH_ACCESS_KEY = getUnsplashAccessKey();

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api/unsplash': {
        target: 'https://api.unsplash.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/unsplash/, '/search/photos'),
        configure: (proxy, _options) => {
          proxy.on('proxyReq', (proxyReq, _req, _res) => {
            if (UNSPLASH_ACCESS_KEY) {
              proxyReq.setHeader('Authorization', `Client-ID ${UNSPLASH_ACCESS_KEY}`);
            }
          });
        },
        // Logs úteis durante o desenvolvimento (opcional)
        // logLevel: 'debug'
      }
    }
  }
});