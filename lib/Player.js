Class('Player')({
    prototype : {
        userId : null,
        life : 20,
        init : function (config) {
            Object.keys(config).forEach(function (property) {
                this[property] = config[property];
            }, this);
        },

        addDamage : function (ammount) {
            this.life = this.life - ammount;
        },

        addXp : function (ammount) {
            users[this.userId].Xp = users[this.userId].Xp + ammount;
        }
    }
});
