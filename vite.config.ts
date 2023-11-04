/* eslint-env node */
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';
import { VitePWA } from 'vite-plugin-pwa';

const outDir = resolve(__dirname, 'dist');
const rootDir = resolve(__dirname, 'src');
const publicDir = resolve(__dirname, 'public');

const appTitle = 'Salat Time';

const inject = {
  data: {
    appTitle,
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: '/salat-time/',
  build: {
    emptyOutDir: true,
    outDir,
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
      },
    },
  },
  publicDir,
  plugins: [
    vue(),
    basicSsl(),
    createHtmlPlugin({ inject }),
    VitePWA({
      devOptions: { enabled: true },
      injectRegister: 'inline',
      registerType: 'autoUpdate',
      manifest: {
        name: appTitle,
        short_name: appTitle,
        orientation: 'portrait',
        background_color: '#333333',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/favicon.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },
          {
            src: '/favicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  root: rootDir,
  server: {
    port: 4000,
  },
  test: {
    // Because vite root is modified, need to point this to test directory
    include: ['../test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts}'],
    reporters: 'dot',
  },
});
