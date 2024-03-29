var express = require('express');
var app = express();
var port = 80;
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

app.set('views', __dirname + '/tpl');
// app.set('view engine', "jade");
// app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

// app.get("/", function(req, res){
//     res.render("page");
// });

// app.get('/register', function(req, res){
//   res.render("register");
// });

// app.get('/login', function(req, res){
//   res.render("login");
// });

        var channel = new Channel({
            name : 'Treasure Hunt',
            theme : 'Your crew, armed and prepared, arrives at an island where there\'s a big treasure awaiting for you, all of you must compete together to make the right decisions and arrive safely to your destination and comeback alive. Remember this is teamwork and you must address your orders to your captain.',
            roles : ['The Captain', 'Pirate', 'Fishing Man', 'The Doctor', 'Fortune Teller', 'Biologist', 'Scientific']
        });
        channels[channel.name] = channel;

io = require('socket.io').listen(app.listen(port));

io.sockets.on('connection', function (socket) {

    console.log('socketid: ' + socket.id);
    socket.emit('message', { message: 'Welcome to text adventurers' });

    socket.on('create', function (data) {
        var channel = new Channel({
            name : data.channel,
            theme : 'this is a random channel',
            roles : ['batman', 'joker']
        });
        var player = new Player({
            userId : data.userId,
            name : 'master',
            isMaster : true
        });
        channel.appendChild(player);
        channels[channel.name] = channel;
        socket.join(channel.name);
        channel.sendMessage({message : 'channel ' + channel.name + ' created'})
    });

    socket.on('join', function (data) {
        var channel = channels[data.channel];
        var player = new Player({
            name : data.name,
            userId : data.userId,
            socket : socket
        });
        channel.appendChild(player);
        channel.sendMessage({message : player.name + ' is on the game'})
        socket.emit('message', {message: channel.theme});
        socket.join(data.channel);
    });

    socket.on('leave', function (data) {
        var channel = channels[data.channel];
        var player = null;
        channel.children.forEach(function (player) {
            if (player.userId === data.userId) {
                player = player;
            }
        });
        channel.sendMessage({message : player.name + ' left the game'})
        channel.removeChild(player);
        socket.leave(data.channel);
    });

    socket.on('send', function (data) {
        if (channels[data.channel]) {
            channels[data.channel].sendMessage(data);
        }
    });

    socket.on('register', function (data) {
      var valid = User.validate(data.username);
      if (valid) {
        var user = new User({
          email : data.username,
          password : data.passwd
        })
        users[user.id] = user;
        socket.emit('response', {type : 'ok', userId : user.id});
      } else {
        socket.emit('response', {type : 'error'});
      }
    });

    socket.on('login', function (data) {
      var user = User.auth(data);
      if (user) {
        socket.emit('auth', {type : 'ok', userId : user.id});
      } else {
        socket.emit('auth', "error");
      }
    });

    socket.on('channels', function (data) {
        var result = [];
        Object.keys(channels).forEach(function (id) {
            result.push({
                id : channels[id].id,
                name : channels[id].name,
                theme : channels[id].theme,
                roles : channels[id].roles
            });
        });
        socket.emit('channels', {channels : result});
    });
});


console.log('listening on port:' + port);
