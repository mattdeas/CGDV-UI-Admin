const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/dist'));

app.get('/*', (req,res) => res.sendfile(path.join(__dirname)));

const server = http.createServer(app);

server.listen(port,() => console.log('UI-Admin Running...'));
