const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
};

// Prévia limitada aos arquivos públicos do site, sem expor documentação ou pastas.
const publicPath =
  /^\/(?:index\.html|styles\.css|favicon\.ico|js\/(?:app|config)\.js|assets\/[\w.-]+\.(?:png|webp|jpg))$/;
const server = http.createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  const url = new URL(request.url, 'http://127.0.0.1:4173');
  const pathname = url.pathname === '/' ? '/index.html' : url.pathname;
  if (!publicPath.test(pathname)) {
    response.writeHead(404).end('Arquivo não disponível na prévia.');
    return;
  }

  try {
    const content = await fs.readFile(path.join(root, pathname.slice(1)));
    response.writeHead(200, {
      'Content-Type': types[path.extname(pathname)],
      'Content-Length': content.length,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch (error) {
    response
      .writeHead(error.code === 'ENOENT' ? 404 : 500)
      .end('Não foi possível abrir o arquivo.');
  }
});

server.listen(4173, '127.0.0.1', () => {
  console.log('Prévia local: http://127.0.0.1:4173 — Ctrl+C para encerrar.');
});

server.on('error', (error) => {
  console.error(`Não foi possível iniciar a prévia: ${error.message}`);
  process.exitCode = 1;
});
