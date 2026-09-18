import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      name: 'NanairoAccessibility',
      formats: ['es', 'iife'],
      fileName: (format) => `nanairo-accessibility.${format}.js`,
    },
    sourcemap: true,
  },
});
