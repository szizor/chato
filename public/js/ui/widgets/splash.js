Class(Chato.UI, 'Splash').inherits(Chato.UI.Widget)({

    html : '<div class="splash-screen screen show">\
                <div class="container">\
                  <div class="buttons-holder">\
                    <a href="#" class="btn-register btn btn-block btn-large">\
                      <span class="fui-plus pull-left"></span>\
                      <span class="lbl">Register</span>\
                      <span class="fui-arrow-right pull-right"></span>\
                    </a>\
                    <a href="#" class="btn-singin btn btn-block btn-large">\
                      <span class="fui-user pull-left"></span>\
                      <span class="lbl">Sing In</span>\
                      <span class="fui-arrow-right pull-right"></span>\
                    </a>\
                  </div>\
                </div>\
              </div>\
            ',

    prototype : {

        init : function (args) {
            var _this = this;
            Chato.UI.Widget.prototype.init.apply(this, [args]);
        },

        destroy : function destroy () {
            Chato.UI.Widget.prototype.destroy.apply(this);
        }
    }
});
