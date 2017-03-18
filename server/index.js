'use strict'

const express = require('express');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const directoryToServer = 'client';
const port = 8080;

app.use('/', express.static(path.join(__dirname, '..', directoryToServer)));

const httpsOptions = {
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-server.crt.pem')),
  key: fs.readFileSync(path.join(__dirname, 'certs', 'server', 'my-server.key.pem')),
  requestCert: false,
  rejectUnauthorized: true
}

app.get('/foo/:id', function(req, res){
  //console.log(req);
  //res.sendfile('home.json');
  console.log(req.params);
  //console.log(req.query);
  res.send('Successed!');
});

app.post('/foo/:id', function(req, res){
  //console.log(req);
  //res.sendfile('home.json');
   console.log(req.body);
   console.log(req.get('Authorization'));
  //console.log(req.query);
  //console.log(req.query);
  res.send({ status: 'SUCCESS' });
});

https.createServer(httpsOptions, app)
  .listen(port, function() {
    console.log('Server the directory at https://192.168.1.162:'+port);
  })
