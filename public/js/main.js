$(function() {

    window.socket = io.connect('/');

    window.splashManager = new Chato.UI.SplashManager({});
    $(document.body).append( splashManager.element );

});
