var express = require('express');
var app = express();
var port = 5000;

BASE_PATH = process.cwd();

require(BASE_PATH + '/vendor/neon/neon.js');

app.get('/', function(req, res){
  res.send('lets play');
});

app.listen(port);
console.log('listening on port:' + port);
