import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Evita heredar el postcss.config del proyecto padre (CV).
  css: { postcss: {} },
  server: { port: 5181, strictPort: true, host: true },
  preview: { port: 5181, strictPort: true },
});
