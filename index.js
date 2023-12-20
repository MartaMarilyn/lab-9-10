const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const HOST = 'localhost';
const PORT = 3000;

let server = http.createServer((req, res) => {
    if (req.method == "POST") {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end', () => {
            console.log(body);
            res.writeHead(200, {'Content-Type': "text/plain"});
            res.end("Данные успешно отправлены на сервер.");
        });
    } else if (req.method == "GET") {
        let filePath = path.join(
            __dirname,
            req.url === "/" ? "index.html" : req.url
        );
    
        let extName = path.extname(filePath);
        let contentType = 'text/html';
    
        switch (extName) {
            case '.css':
                contentType = 'text/css';
                break;
            case '.js':
                contentType = 'text/javascript';
                break;
            case '.json':
                contentType = 'application/json';
                break;
            case '.png':
                contentType = 'image/png';
                break;
            case '.jpg':
                contentType = 'image/jpg';
                break;
        }
    
        res.writeHead(200, {'Content-Type': contentType});
    
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }
});

server.listen(PORT, HOST, () => {
    console.log(`Run server: http://${HOST}:${PORT}`);
});