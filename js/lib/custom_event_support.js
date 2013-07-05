Module('CustomEventSupport')({
    eventListeners: null,
    bind: function (type, eventHandler) {
        var found;

        if (!this.eventListeners) {
            this.eventListeners = {};
        }

        if (!this.eventListeners[type]) {
            this.eventListeners[type] = [];
        }

        found = false;

        $(this.eventListeners[type]).each(function (i) {
            if (this == eventHandler) {
                found = true;
                return false;
            }
        });

        if (!found) {
            this.eventListeners[type].push(eventHandler);
        }

        return this;
    },

    unbind: function (type, eventHandler) {
        var i = 0,
            found = false;

        if (!this.eventListeners) {
            this.eventListeners = {};
        }

        if (typeof eventHandler == 'undefined') {
            this.eventListeners[type] = [];
        }

        $.each(this.eventListeners[type] || [], function (counter) {
            if (this == eventHandler) {
                i = counter;
                found = true;
                return false;
            }
        });

        if (found) {
            this.eventListeners[type].splice(i, 1);
        }

        return this;
    },

    trigger: function (type, data) {
        var event, listeners, that, allowDefault;

        if (!this.eventListeners) {
            this.eventListeners = {};
        }

        event = new CustomEvent(type, data);
        event.target = this;
        listeners = this.eventListeners[type] || [];
        that = this;
        allowDefault = true;
        $(listeners).each(function () {
            this.apply(that, [event, data]);
            if (event._preventDefault) {
                allowDefault = false;
            }
            if (event._stop) {
                return false;
            }
        });

        event = null;
        return allowDefault;
    },

    prototype: {
        eventListeners: null,

        bind: function (type, eventHandler) {
            var found;

            if (!this.eventListeners) {
                this.eventListeners = {};
            }

            if (!this.eventListeners[type]) {
                this.eventListeners[type] = [];
            }

            found = false;

            $(this.eventListeners[type]).each(function (i) {
                if (this == eventHandler) {
                    found = true;
                    return false;
                }
            });

            if (!found) {
                this.eventListeners[type].push(eventHandler);
            }

            return this;
        },

        unbind: function (type, eventHandler) {
            var i = 0,
                found = false;

            if (!this.eventListeners) {
                this.eventListeners = {};
            }

            if (typeof eventHandler == 'undefined') {
                this.eventListeners[type] = [];
            }

            $.each(this.eventListeners[type] || [], function (counter) {
                if (this == eventHandler) {
                    i = counter;
                    found = true;
                    return false;
                }
            });

            if (found) {
                this.eventListeners[type].splice(i, 1);
            }

            return this;
        },

        trigger: function (type, data) {
            var event, listeners, that, allowDefault;

            if (!this.eventListeners) {
                this.eventListeners = {};
            }

            event = new CustomEvent(type, data);
            event.target = this;
            listeners = this.eventListeners[type] || [];
            that = this;
            allowDefault = true;
            $(listeners).each(function () {
                this.apply(that, [event, data]);
                if (event._preventDefault) {
                    allowDefault = false;
                }
                if (event._stopPropagation) {
                    return false;
                }
            });

            event = null;
            return allowDefault;
        }
    }
});
