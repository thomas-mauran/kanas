import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    ssr: true, // Enable SSR build
    rollupOptions: {
      input: './src/entry-server.js', // Specify the server entry point
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  server: {
    port: 3000, // Change port to a non-reserved port
    middlewareMode: 'ssr', // Enable SSR middleware
  },
  ssr: {
    noExternal: ['vue'], // Mark 'vue' as not external for SSR bundling
  },
});
