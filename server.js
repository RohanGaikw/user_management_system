const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const db = require('./db'); // Make sure this path is correct
const path = require('path');


const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        if (req.url === '/') {
            fs.readFile('./public/index.html', (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Page not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
        } else if (req.url.match(/\.css$/)) {
            const cssPath = path.join(__dirname, 'public', req.url);
            fs.readFile(cssPath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('CSS file not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.end(data);
                }
            });
        } else if (req.url.match(/\.js$/)) {
            const jsPath = path.join(__dirname, 'public', req.url);
            fs.readFile(jsPath, (err, data) => {
                if (err) {
                    res.writeHead(404);
                    res.end('JS file not found');
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.end(data);
                }
            });
        }
    } else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const formData = qs.parse(body);

            if (req.url === '/Signup') {
                const { username, email, password } = formData;
                const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
                db.query(query, [username, email, password], (err, result) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Signup failed');
                    } else {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Signup successful');
                    }
                });
            }

            if (req.url === '/Login') {
                const { email, password } = formData;
                const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
                db.query(query, [email, password], (err, results) => {
                    if (err) {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Login failed');
                    } else if (results.length > 0) {
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Login successful');
                    } else {
                        res.writeHead(401, { 'Content-Type': 'text/plain' });
                        res.end('Invalid credentials');
                    }
                });
            }
        });
    }
});

server.listen(3002, () => {
    console.log('Server is running on http://localhost:3002');
});
