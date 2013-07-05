
var socket = io.connect('http://localhost:8080');

$(function() {

    window.socket = io.connect('http://localhost:8080');

    window.splashManager = new Chato.UI.SplashManager({});
    $(document.body).append( splashManager.element );

});
