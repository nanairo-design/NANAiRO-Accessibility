import { defineConfig } from 'vite';

export default defineConfig({
  base: '/NANAiRO-Accessibility/',
  publicDir: 'public',
  build: {
    outDir: 'site-dist',
    emptyOutDir: true,
    sourcemap: false,
  },
});
