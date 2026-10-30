import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Official address. Used for full URLs in hreflang, canonical and link-preview tags.
  site: 'https://lobitosponchos.com',
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // Cap very large originals so the build never emits huge files.
    breakpoints: [320, 480, 640, 768, 960, 1280, 1600, 1920, 2560, 3200],
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
