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
         * @param {String} message.targetPlayer <optional>                 (action)
         * @param {String} message.amount      <optional>                  (action)
         * @param {String} message.player
         * @param {String} message.message
         */
        sendMessage : function (message) {
            switch(message.type){
            case "damage":
                this[message.targetPlayer].addDamage(message.amount);
                message.message = message.targetPlayer +
                    " loose " + message.amount + " point(s)";
                this.broadcastMessage(message);
                break;
            case "xp" :
                this[message.targetPlayer].addXp(message.amount);
                message.message = message.targetPlayer +
                    " gain " + message.amount + " point(s)";
                this.broadcastMessage(message);
                break;
            default:
                this.broadcastMessage(message);
                break;
            }

        },

        broadcastMessage : function (message) {
            io.sockets.in(this.name).emit('message', message);
        }
    }
});
