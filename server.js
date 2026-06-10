const http = require('http');
const { execSync } = require('child_process');

const PORT = 8080;

function createServer() {
  const server = http.createServer((req, res) => {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Bot is running!');
    } else {
      res.writeHead(404);
      res.end();
    }
  });

  return server;
}

function keepAlive() {
  const server = createServer();

  server.listen(PORT, '0.0.0.0', () => {
    // Silently starts — no console clutter
  });

  // Suppress server errors silently (equivalent to suppressing Werkzeug logs)
  server.on('error', () => {});

  return server;
}

module.exports = { keepAlive };
