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

        init : function (args) {
            var _this = this;
            Chato.UI.Widget.prototype.init.apply(this, [args]);

            window.onload = function(){
              var roomSelect = document.getElementById('select_unselect');
              var rolesSelect = document.getElementById('roles');
              
              var myJSON = '[\
                              {"room": {"id" : "1", "name" : "fringe", "roles": ["walter", "olivia", "fbi"]}},\
                              {"room": {"id" : "2", "name" : "superheroes", "roles": ["superman", "batman", "ironman"]}}\
                            ]';
              var rooms = JSON.parse(myJSON);
   
              for(var i = 0; i < rooms.length; i++) {
                  var opt = document.createElement('option');
                  opt.innerHTML = rooms[i].room.name;
                  opt.value = rooms[i].room.name;
                  roomSelect.appendChild(opt);
              }

              document.getElementById('select_unselect').selectedIndex = -1;

              $('#select_unselect').change(function() {
                  var roomName = this.options[this.selectedIndex].text;
                  for(var i = 0; i < rooms.length; i++) {
                      if (roomName == rooms[i].room.name) {
                          var roles = rooms[i].room.roles;
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
              });
              $(".btn-play").click(function() {
                console.log('call to room');
              });
            }

        },

        destroy : function destroy () {
            Chato.UI.Widget.prototype.destroy.apply(this);
        }
    }
});
