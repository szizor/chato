Class(Chato.UI, 'UserMessage').inherits(Chato.UI.Widget)({
    html: '\
        <div class="user-message">\
            <span class="user-message-controls">\
                <i class="input-icon fui-check-inverted"></i>\
                <i class="input-icon fui-cross"></i>\
            </span>\
            <strong class="user-nickname"></strong>:\
            <span class="user-message-content"></span>\
        </div>\
    ',


    prototype: {
        init: function (attributes) {
            Chato.UI.Widget.prototype.init.apply(this, [attributes]);

            this.nicknameContainer = this.element.find('.user-nickname');
            this.messageContentContainer = this.element.find('.user-message-content');
            this.messageControls = this.element.find('.user-message-controls');
            this.winButton = this.element.find('.fui-check-inverted');
            this.banButton = this.element.find('.fui-cross');

            // Every message will have an owner -> user
            this.messageContentContainer.html(this.content);
            this.nicknameContainer.html(this.name);
        },

        bindElements: function () {
            var _this = this;
            this.winButton.on('click', function (ev) {
                ev.preventDefault();
                _this._onWinClicked(ev);
            });
            this.banButton.on('click', function (ev) {
                ev.preventDefault();
                _this._onBanClicked(ev);
            });
            this.nicknameContainer.on('click', function (ev) {
                ev.preventDefault();
                _this.messageControls.toggle();
            });
        },

        _onWinClicked: function (ev) {
            ev.preventDefault();
            console.log('Win for the user: ', this.userID);
        },

        _onBanClicked: function (ev) {
            ev.preventDefault();
            console.log('ban the comment for the user: ', this.userId);
            socket.emit('send', {
                type: 'damage',
                userId: this.parent.userId,
                channel: this.parent.channel,
                message: 'banned comment',
                targetUserId: this.userId,
                isMaster: this.parent.isMaster
            });
        }
    }
});