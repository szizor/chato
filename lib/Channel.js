Class('Channel').includes(NodeSupport)({
    prototype : {
        init : function (config) {
            this.id    = getuid();
            this.name  = config.name;
            this.theme = config.theme;
            this.roles = config.roles || [];
        },

        /* Send Message
         *
         * @param {Object} message
         * @param {String} message.type one of ["damage", "xp"] <optional> (action)
         * @param {String} message.targetUserId <optional>                 (action)
         * @param {String} message.userId
         * @param {String} message.message
         */
        sendMessage : function (message) {
            console.log(message);
            var player, damagePoint = 1, xpPoint = 5;


            message.name = (this._getPlayer(message.userId) && this._getPlayer(message.userId).name) || 'Server';


            switch(message.type){
            case "damage":
                player = this._getPlayer(message.targetUserId);
                if (player) {
                    player.addDamage(damagePoint);

                    message.message = player.role +
                        " loose " + damagePoint + " point";
                    this.broadcastMessage(message);
                    

                    if (player.life <= 0) {
                        message.message = player.name + ' died';
                        this.broadcastMessage(message);
                        player.parent.removeChild(player);
                        player.socket.leave(this.name);
                    }                    
                }

                break;
            case "xp" :
                if (player) {
                    player = this._getPlayer(message.targetUserId);

                    player.addXp(xpPoint);
                    message.message = player.role +
                        " gain " + xpPoint + " points";
                    this.broadcastMessage(message);                    
                }

                break;
            default:
                this.broadcastMessage(message);
                break;
            }

        },

        broadcastMessage : function (message) {
            io.sockets.in(this.name).emit('message', message);
        },

        _getPlayer : function (userId) {
            return this.children.filter(function (player) {
                return player.userId === userId;
            })[0];
        }
    }
});
