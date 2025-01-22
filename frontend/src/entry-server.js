import { createApp } from './main';

export async function render(url, context) {
  const { app } = createApp();
  console.log(`[SSR] Rendering URL: ${url}`); // Log each server-side render
  return app;
}