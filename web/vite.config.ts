import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/curvy-dolphin', // Set for GitHub Pages project site
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
