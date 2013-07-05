
var screens = {
    splash: $('.splash-screen'),
    register: $('.register-screen'),
    signin: $('.sign-in-screen')
};

/* splash */
var registerBtn = screens.splash.find('.btn-register');
var signinBtn = screens.splash.find('.btn-singin');

registerBtn.bind('click', function (ev) {
    screens.register.addClass('show');
});
signinBtn.bind('click', function (ev) {
    screens.signin.addClass('show');
});


/* back */
$('.back').bind('click', function (ev) {
    $(this).parents('.screen').removeClass('show');
});
