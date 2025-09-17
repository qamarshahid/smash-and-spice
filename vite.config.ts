import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/smash-and-spice/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
