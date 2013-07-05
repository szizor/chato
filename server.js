var express = require('express');
var app = express();
var port = 8080;
users = {};
channels = {};

getuid = (function generateUid() {
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

channels["123"] = new Channel({ name : "Test", theme : "Testing channel"});

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){
    res.render("page");
});

app.get('/register', function(req, res){
  res.render("register");
});

app.get('/login', function(req, res){
  res.render("login");
});


var io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {
    socket.join('123');
    socket.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        console.log(channels[data.channelId]);
        channels[data.channelId].sendMessage(data);
//        io.sockets.emit('message', data);
        //io.sockets.in('123').emit('message', data);
    });
    socket.on('register', function (data) {
      var valid = User.validate(data.username);
      if (valid) {
        var user = new User({
          email : data.username,
          password : data.passwd
        })
        users[user.id] = user;
        io.sockets.emit('response', "ok");
      } else {
        io.sockets.emit('response', "error");
      }
    });
    socket.on('login', function (data) {
      var valid = User.auth(data);
      if (valid) {
        io.sockets.emit('auth', "ok");
      } else {
        io.sockets.emit('auth', "error");
      }
    });
});


console.log('listening on port:' + port);
