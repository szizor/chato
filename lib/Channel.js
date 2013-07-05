Class('Channel').includes(NodeSupport)({
    prototype : {
        init : function (config) {
            this.id    = 123;
            this.name  = config.name;
            this.theme = config.theme;
            this.roles = config.roles || [];
        },

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
            io.sockets.in(this.id).emit('message', {message : textMessage});
        }
    }
});
