import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { build, root } from './build.mjs';

const isPreview = process.argv.includes('--dist');
const directory = await build();
const run = promisify(execFile);
const portArg = process.argv.indexOf('--port');
const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf' };

const server = createServer(async (request, response) => {
  try {
    if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
    const url = new URL(request.url, 'http://localhost');
    let path;
    try { path = decodeURIComponent(url.pathname); } catch { response.writeHead(400); response.end('Bad request'); return; }
    if (path.includes('\0')) { response.writeHead(400); response.end('Bad request'); return; }
    // A fresh process avoids stale ES module caches when content/components change.
    if (path === '/' && !isPreview) await run(process.execPath, [join(root, 'scripts/build.mjs')]);
    const filename = resolve(directory, '.' + (path === '/' ? '/index.html' : path));
    if (filename !== directory && !filename.startsWith(directory + sep)) { response.writeHead(403); response.end('Forbidden'); return; }
    if (!(await stat(filename)).isFile()) { response.writeHead(404); response.end('Not found'); return; }
    const body = await readFile(filename);
    response.writeHead(200, {
      'Content-Type': mime[extname(filename)] || 'application/octet-stream',
      'Content-Length': body.byteLength,
      'Cache-Control': 'no-cache',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500);
    response.end(error.code === 'ENOENT' ? 'Not found' : 'Unable to serve this file');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`Iki portfolio is ready at http://localhost:${port}`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; });
