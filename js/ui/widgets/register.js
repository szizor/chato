Class(Chato.UI, 'Register').inherits(Chato.UI.Widget)({

    html : '<div class="register-screen screen">\
              <div class="container">\
                <header class="flex">\
                  <a href="#" class="back btn auto">Welcome</a>\
                  <h3 class="title auto">Register</h3>\
                  <a href="#" class="done btn btn-success auto">Done</a>\
                </header>\
                <div class="screen-body">\
                  <form action="">\
                    <label for="">\
                      <span class="fui-user"></span>\
                      <input type="text" value="" placeholder="Username" class="span3">\
                    </label>\
                    <label for="">\
                      <span class="fui-lock"></span>\
                      <input type="text" value="" placeholder="Password" class="span3">\
                    </label>\
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
            this.bindEvents();
        },

        bindEvents : function bindEvents () {
            var _this = this;

            this.back.bind('click', function (ev) {
                _this.back.parents('.screen').removeClass('show');
            });
        },

        destroy : function destroy () {
            this.back.unbind('click');
            Chato.UI.Widget.prototype.destroy.apply(this);
        }
    }
});
