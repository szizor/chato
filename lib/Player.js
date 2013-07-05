Class('Player').includes(NodeSupport)({
    prototype : {
        userId : null,
        life : 10,
        role : '',
        isMaster : false,
        init : function (config) {
            Object.keys(config).forEach(function (property) {
                this[property] = config[property];
            }, this);
        },

        addDamage : function (amount) {
            this.life = this.life - amount;
        },

        addXp : function (amount) {
            users[this.userId].Xp = users[this.userId].Xp + amount;
        }
    }
});
