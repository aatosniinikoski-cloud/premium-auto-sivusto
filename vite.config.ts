import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production builds are served from GitHub Pages at /premium-auto-sivusto/.
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/premium-auto-sivusto/' : '/',
  plugins: [react()],
  server: { port: 5173, open: false },
}));
