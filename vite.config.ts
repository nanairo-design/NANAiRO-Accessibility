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
  esbuild: {
    /*
     * Escape non-ASCII characters in the output. A classic script inherits the
     * host document's encoding when nothing else declares one, so on a
     * Shift_JIS page the bundle's UTF-8 Japanese was decoded as Shift_JIS and
     * the whole widget rendered as mojibake. An all-ASCII bundle decodes the
     * same way under any encoding.
     */
    charset: 'ascii',
  },
});
