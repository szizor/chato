Class('Channel')({
    prototype : {
        init : function (config) {
            this.name  = config.name;
            this.theme = config.theme;
            this.roles = config.roles || [];
        }
    }
});
