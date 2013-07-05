Class(Chato.UI, 'SignIn').inherits(Chato.UI.Widget)({

    html : '<div class="sign-in-screen screen">\
              <div class="container">\
                <header class="flex">\
                  <a href="#" class="back prev btn auto">Go Back</a>\
                  <h3 class="title auto">Sing In</h3>\
                  <a href="#" class="done next btn btn-success auto">Sing In</a>\
                </header>\
                <div class="screen-body">\
                  <form action="">\
                    <div class="control-group">\
                      <span class="fui-user"></span>\
                      <input type="email" value="" placeholder="Username" class="span3 username">\
                    </div>\
                    <div class="control-group">\
                      <span class="fui-lock"></span>\
                      <input type="password" value="" placeholder="Password" class="span3 password">\
                    </div>\
                  </form>\
                </div>\
              </div>\
            </div>\
            ',

    prototype : {
        init : function (args) {
            var _this = this;
            Chato.UI.Widget.prototype.init.apply(this, [args]);

            this.back = this.element.find('.back');
            this.done = this.element.find('.done');
            this.username = this.element.find('.username');
            this.password = this.element.find('.password');

            this.bindEvents();
        },

        bindEvents : function bindEvents () {
            var _this = this;

            this.back.bind('click', function (ev) {
                _this.back.parents('.screen').removeClass('show');
            });

            this.done.bind('click', function (ev) {
                var valid = _this.validateInputs();
                if ( valid ) {
                    socket.emit('login', {
                        passwd  : _this.password[0].value,
                        username: _this.username[0].value
                    });
                }
            });

            socket.on('auth', function (data, id) {
                if ( data == "ok" ) {
                  alert("login ok")
                  // TODO : redirect to main page
                  _this.parent.roomSelect.element.addClass('show');
                  window.userID = id;
                } else {
                  alert("The username or password is wrong");
                }
            });
        },

        validateInputs : function validateInputs () {
            var username = this.username.val(),
                password = this.password.val(),
                pass = true;

            if ( !username || !password ) pass = false;

            ( !username )
                ? this.username.parent().addClass('error')
                : this.username.parent().removeClass('error');

            ( !password )
                ? this.password.parent().addClass('error')
                : this.password.parent().removeClass('error');

            if ( pass ) {
                console.log("send form");
                return true;
            } else {
                console.log("not send  form");
                return false;
            }
        },

        destroy : function destroy () {
            this.back.unbind('click');
            Chato.UI.Widget.prototype.destroy.apply(this);
        }
    }
});
