import { createApp } from './main';

export function render(url) {
  const { app } = createApp();
  return app.renderToString(); 
}
