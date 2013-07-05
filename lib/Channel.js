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
         * @param {String} message.ammount      <optional>                 (action)
         * @param {String} message.player
         * @param {String} message.message
         */
        sendMessage : function (message) {
            switch(message.type){
            case "damage":
                this[message.targetPlayer].addDamage(message.ammount);
                this.broadcastMessage( message.targetPlayer +
                                       " loose " + message.ammount + " point(s)" );
                break;
            case "xp" :
                this[message.targetPlayer].addXp(message.ammount);
                this.broadcastMessage( message.targetPlayer +
                                       " gain " + message.ammount + " point(s)" );
                break;
            default:
                this.broadcastMessage(message.message);
                break;
            }

        },

        broadcastMessage : function (textMessage) {
            io.sockets.in(this.name).emit('message', {message : textMessage});
        }
    }
});
