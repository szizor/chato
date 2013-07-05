var express = require('express');
var app = express();
var port = 5000;
var users = {};

var getuid = (function generateUid() {
            var getUid = function(length){
                var i, uid, min, max;

                length = length || 32;
                uid = '';
                min = 0;
                max = 14;
                for(i = 0; i < length; i++){
                    uid += getUid.codes[ Math.floor(Math.random() * (max - min + 1)) + min ];
                }
                return uid;
            };

            getUid.codes = [0, 1, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

            return getUid;
        }());

BASE_PATH = process.cwd();

require(BASE_PATH + '/vendor/neon/neon.js');
require(BASE_PATH + '/vendor/NodeSupport.js');
require(BASE_PATH + '/lib/App.js');
require(BASE_PATH + '/lib/Player.js');
require(BASE_PATH + '/lib/User.js');
require(BASE_PATH + '/lib/Channel.js');

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

io.sockets.on('action', function (socket) {
    console.log('action received');
});

console.log('listening on port:' + port);
