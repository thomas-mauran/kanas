import express from 'express';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: 'ssr' },
  });

  // Use Vite's connect instance as middleware
  app.use(vite.middlewares);

  // Serve SSR pages
  app.use('*', async (req, res, next) => {
    try {
      const url = req.originalUrl;

      // Load the index.html file for the template
      const template = await vite.transformIndexHtml(url, `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Vite SSR Dev</title>
          </head>
          <body>
            <div id="app"></div>
          </body>
        </html>
      `);

      // Load the server entry module dynamically
      const { render } = await vite.ssrLoadModule('/src/entry-server.js');
      const appHtml = await render(url);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

startServer();
