import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { getWidgetConfigBySiteKey } from './config-service.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..', '..');
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function sendFile(res, absolutePath) {
  if (!absolutePath.startsWith(repoRoot)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (!fs.existsSync(absolutePath) || fs.statSync(absolutePath).isDirectory()) {
    res.writeHead(404);
    res.end('Not Found');
    return;
  }

  const ext = path.extname(absolutePath);
  res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
  fs.createReadStream(absolutePath).pipe(res);
}

const server = http.createServer((req, res) => {
  const requestUrl = new URL(req.url || '/', `http://localhost:${port}`);

  if (requestUrl.pathname === '/v1/widget-config') {
    const siteKey = requestUrl.searchParams.get('siteKey') || 'demo-site-key';
    sendJson(res, 200, getWidgetConfigBySiteKey(siteKey));
    return;
  }

  if (requestUrl.pathname === '/') {
    sendFile(res, path.join(repoRoot, 'docs/demo/index.html'));
    return;
  }

  sendFile(res, path.join(repoRoot, requestUrl.pathname));
});

server.listen(port, '0.0.0.0', () => {
  console.log(`NANAiRO dev server running at http://localhost:${port}`);
});
