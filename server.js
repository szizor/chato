var express = require('express');
var app = express();
var port = 80;

app.get('/', function(req, res){
  res.send('Hello World!');
});

app.listen(port);
console.log('listening on port:' + port);