Class('CustomEvent')({
    prototype: {
        init: function (type, data) {
            var property;
            this.type = type;
            this.data = data;
        },

        stopPropagation: function () {
            this._stopPropagation = true;
        },

        preventDefault: function () {
            this._preventDefault = true;
        }
    }
});
