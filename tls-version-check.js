const tls = require('tls');
const fs = require('fs');
const https = require('https');

console.log(`TLS version being used: ${tls.DEFAULT_MAX_VERSION}`);

// Configuración de servidor HTTPS para la prueba
const options = {
    key: fs.readFileSync('ssl-key.key'),
    cert: fs.readFileSync('ssl-cert.crt'),
};

const server = https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end('TLS version check!');
});

server.listen(8443, () => {
    console.log('Server running on https://localhost:8443');
});
