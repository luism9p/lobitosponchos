import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
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
