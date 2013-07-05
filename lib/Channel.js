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
            var player, damagePoint = 1, xpPoint = 5;

            switch(message.type){
            case "damage":
                player = this._getPlayer(message.targetUserId);
                player.addDamage(message.amount);

                message.message = player.role +
                    " loose " + damagePoint + " point";
                this.broadcastMessage(message);
                break;
            case "xp" :
                player = this._getPlayer(message.targetUserId);

                player.addXp(message.amount);
                message.message = player.role +
                    " gain " + xpPoint + " points";
                this.broadcastMessage(message);
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
