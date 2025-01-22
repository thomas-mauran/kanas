import { createSSRApp } from 'vue';
import App from './App.vue';

export function createApp() {
  // Create and return the app instance
  const app = createSSRApp(App);
  return { app };
}
