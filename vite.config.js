import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// En GitHub Pages el sitio vive en /Landing-IR-CONSULTING/. BASE permite cambiarlo (p. ej. dominio propio: BASE=/).
export default defineConfig(({ command, isPreview }) => ({
  base: process.env.BASE ?? (command === 'build' || isPreview ? '/Landing-IR-CONSULTING/' : '/'),
  plugins: [react()],
  // Evita heredar el postcss.config del proyecto padre (CV).
  css: { postcss: {} },
  server: { port: 5181, strictPort: true, host: true },
  preview: { port: 5181, strictPort: true },
}));
