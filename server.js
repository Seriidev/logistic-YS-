import { createServer } from 'node:http';
import { existsSync, statSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = path.join(process.cwd(), 'dist');
const PORT = Number(process.env.PORT || 3000);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

function resolveFilePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(DIST_DIR, normalized);

  if (!filePath.startsWith(DIST_DIR)) {
    return null;
  }

  return filePath;
}

async function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const body = await readFile(filePath);

  res.writeHead(200, {
    'Content-Type': MIME_TYPES[ext] || 'application/octet-stream',
  });
  res.end(body);
}

const server = createServer(async (req, res) => {
  try {
    if (!req.url || req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405).end('Method Not Allowed');
      return;
    }

    const url = new URL(req.url, 'http://localhost');
    let filePath = resolveFilePath(url.pathname === '/' ? '/index.html' : url.pathname);

    if (!filePath) {
      res.writeHead(403).end('Forbidden');
      return;
    }

    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    if (existsSync(filePath) && statSync(filePath).isFile()) {
      if (req.method === 'HEAD') {
        res.writeHead(200).end();
        return;
      }

      await sendFile(res, filePath);
      return;
    }

    const htmlPath = `${filePath}.html`;
    if (existsSync(htmlPath)) {
      if (req.method === 'HEAD') {
        res.writeHead(200).end();
        return;
      }

      await sendFile(res, htmlPath);
      return;
    }

    const fallback = path.join(DIST_DIR, 'index.html');
    if (req.method === 'HEAD') {
      res.writeHead(200).end();
      return;
    }

    await sendFile(res, fallback);
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.writeHead(500).end('Internal Server Error');
    }
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Yuusell website listening on http://localhost:${PORT}`);
});
