var express = require('express');
var app = express();
var port = 5000;

BASE_PATH = process.cwd();

require(BASE_PATH + '/vendor/neon/neon.js');

app.get('/', function(req, res){
  res.send('lets play');
});


var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
});

app.listen(port);
console.log('listening on port:' + port);
