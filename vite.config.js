import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:4000', // Replace 4000 with your backend port if different
    },
  },
});