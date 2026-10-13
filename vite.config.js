import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site be hosted from any sub-folder (e.g. GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
  build: { chunkSizeWarningLimit: 900 },
});
