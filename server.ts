import 'zone.js';

import {ngExpressEngine} from '@nguniversal/express-engine';
import * as express from 'express';
import {join} from 'path';

const {performance} = require('perf_hooks');

import bootstrap from './src/main.server';
import {APP_BASE_HREF} from '@angular/common';
import {existsSync} from 'fs';
import {backend} from './src/environments/environment';


// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({ bootstrap }));

  server.use((req, res, next) => {
    if (!req.url.startsWith('/ngsw')) {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`${(
          req.header('x-forwarded-for') ||
          req.connection.remoteAddress ||
          req.headers['X-Real-IP']
        )} ${new Date(start).toISOString()} ${req.url} - ${duration}ms`);
      });
    }
    next();
  });

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('/sitemap.xml', (req, res) => {
    res.redirect(`${backend}/sitemap.xml`);
  });

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '30m'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {req, providers: [{provide: APP_BASE_HREF, useValue: req.baseUrl}]});
  });

  return server;
}

const args = process.argv.slice(2);

if (args && args.length > 0 && args[0] === 'perf') {
  console.log('time, heapTotal, heapUsed, external');
  setInterval(() => {
    const mem = process.memoryUsage();
    console.log(`${performance.now()}, ${mem.heapTotal / (1024 * 1024)}, ${mem.heapUsed / (1024 * 1024)}, ${mem.external / (1024 * 1024)}`);
  }, 5000);
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export default bootstrap;

export * from './src/main.server';
