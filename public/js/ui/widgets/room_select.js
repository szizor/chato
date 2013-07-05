Class(Chato.UI, 'RoomSelect').inherits(Chato.UI.Widget)({

    html : '<div class="room-select-screen screen">\
                <div class="page-container">\
                  <div class="page-content">\
                      <div class="chato-logo">\
                        <img src="flatui/images/icons/logo.png" alt="logo">\
                        <dl class="palette palette-alizarin">\
                          <dt>ROLE CHAT</dt>\
                        </dl>\
                      </div>\
                      <form action="">\
                          <p>Select your room</p>\
                          <select id="select_unselect">\
                          </select>\
                          <p class="rolename disabled" class>Choose your role</p>\
                          <select id="roles" class="select-block span3 disabled">\
                          </select>\
                          <div class="select-button">\
                            <div class="btn btn-large btn-block btn-primary btn-play">Play</div>\
                          </div>\
                      </form>\
                      </div>\
                  </div>\
                </div>\
              </div>\
            ',

    prototype : {

        selectedRoom : null,
        selectedRole : null,

        init : function (args) {
            var _this = this;
            Chato.UI.Widget.prototype.init.apply(this, [args]);
            socket.on("channels", function(data){
              console.log(data)
              _this.fillSelect(data.channels);
            });


            this.refresh();

        },

        fillSelect : function fillSelect (roomData) {
              var _this = this;
              //window.onload = function(){
              var roomSelect = document.getElementById('select_unselect');
              var rolesSelect = document.getElementById('roles');
              //console.log(roomData);
              //var myJSON = '[\
              //               {"room": {"id" : "1", "name" : "fringe", "roles": ["walter", "olivia", "fbi"]}},\
              //              {"room": {"id" : "2", "name" : "superheroes", "roles": ["superman", "batman", "ironman"]}}\
              //            ]';
              var rooms = JSON.parse(JSON.stringify(roomData));

              for(var i = 0; i < rooms.length; i++) {
                  var opt = document.createElement('option');
                  opt.innerHTML = rooms[i].name;
                  opt.value = rooms[i].name;
                  roomSelect.appendChild(opt);
              }

              document.getElementById('select_unselect').selectedIndex = -1;

              $('#select_unselect').change(function() {
                  _this.selectedRoom = this.options[this.selectedIndex].text;
                  for(var i = 0; i < rooms.length; i++) {
                      if (_this.selectedRoom == rooms[i].name) {
                          var roles = rooms[i].roles;
                          $('#roles > option').remove();
                          for(var j = 0; j < roles.length; j++) {
                              var opt = document.createElement('option');
                              opt.innerHTML = roles[j];
                              opt.value = roles[j];
                              rolesSelect.appendChild(opt);
                          }
                          $('.rolename').removeClass('disabled');
                          $('#roles').removeClass('disabled');
                          document.getElementById('roles').selectedIndex = -1;
                      }
                  }
              });
              $('#roles').change(function() {
                  $('.select-button').show();
                  _this.selectedRole = this.options[this.selectedIndex].text;
              });
              $(".btn-play").click(function() {
                splashManager.play({
                  channel: _this.selectedRoom,
                  name: _this.selectedRole
                });
                console.log('call to room');
              });
            //}//win
        },

        destroy : function destroy () {
            Chato.UI.Widget.prototype.destroy.apply(this);
        },

        refresh : function refresh () {
            socket.emit("channels");
        }
    }
});
