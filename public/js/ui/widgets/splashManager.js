Class(Chato.UI, 'SplashManager').inherits(Chato.UI.Widget)({

    html : '<div class="splash-manager"></div>',

    prototype : {

        init : function (args) {
            var _this = this;
            Chato.UI.Widget.prototype.init.apply(this, [args]);

            this.appendChild(
                new Chato.UI.Splash({
                    name: 'splash'
                })
            );
            this.splash.render(this.element);
            this.registerBtn = this.splash.element.find('.btn-register');
            this.signinBtn = this.splash.element.find('.btn-singin');

            this.appendChild(
                new Chato.UI.Register({
                    name: 'register'
                })
            );
            this.register.render(this.element);

            this.appendChild(
                new Chato.UI.SignIn({
                    name: 'signin'
                })
            );
            this.signin.render(this.element);

            this.appendChild(
                new Chato.UI.RoomSelect({
                    name: 'roomSelect'
                })
            );
            this.roomSelect.render(this.element);
            this.play = function(ev) {
                var timestamp =  Date.now().toString().replace('.','');
                var chat = new Chato.UI.Chat({
                    userId: window.userID,
                    name: ev.name,
                    socket: socket,
                    channel: ev.channel,
                    isMaster: false
                });
                _this.appendChild(chat);
                chat.render(_this.element);
                _this.roomSelect.element.removeClass('show');
                _this.splash.element.removeClass('show');
                chat.element.addClass('screen show');
            };

            this.bindEvents();
        },

        bindEvents : function bindEvents () {
            var _this = this;
            this.registerBtn.bind('click', function (ev) {
                ev.preventDefault();
                _this.register.element.addClass('show');
            });

            this.signinBtn.bind('click', function (ev) {
                ev.preventDefault();
                _this.signin.element.addClass('show');
            });
        },

        destroy : function destroy () {
            this.registerBtn.unbind('click');
            this.signinBtn.unbind('click');
            Chato.UI.Widget.prototype.destroy.apply(this);
        }
    }
});
