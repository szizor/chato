window.onload = function() {

  var messages = [];
  var socket = io.connect('http://localhost:8080');
  var sendRegisterButton = document.getElementById("send");
  var sendLoginButton = document.getElementById("login");
  var name = document.getElementById("name");
  var pass = document.getElementById("pass");

  socket.on('response', function (data, id) {
    if (data == "ok") {
      alert("register ok")
      window.location.href = "/?id=" + id;
    } else {
      alert("The username is in use");
    }
  });
  socket.on('auth', function (data, id) {
    console.log(data);
    if (data == "ok") {
      alert("login ok")
      window.location.href = "/?id=" + id;
    } else {
      alert("The username or password is wrong");
    }
  });
  sendRegisterButton.onclick = sendMessage = function() {
    if(name.value == "" || pass.value == "") {
      alert("Please fill all fields!");
    } else {
      socket.emit('register', { passwd: pass.value, username: name.value });
    }
  };
  sendLoginButton.onclick = sendMessage = function() {
    if(name.value == "" || pass.value == "") {
      alert("Please fill all fields!");
    } else {
      socket.emit('login', { passwd: pass.value, username: name.value });
    }
  };

}
$(document).ready(function() {
  $("#field").keyup(function(e) {
    if(e.keyCode == 13) {
      sendMessage();
    }
  });
});
