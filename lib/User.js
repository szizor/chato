Class('User')({
    validate : function(data){
      console.log(users);
      if (Object.keys(users).length === 0){
        return true;
      }
      for (var key in users) {
        if (users[key]["email"] === data){
          return false;
        } else {
          return users[key];
        }
      }
    },
    auth : function(data){
      console.log(users);
      if (Object.keys(users).length === 0){
        return false;
      }
      for (var key in users) {
        if (users[key]["email"] === data.username && users[key]["password"] === data.passwd){
          return users[key]["id"];
        } else {
          return false;
        }
      }
    },
    prototype : {
        email : '',
        password : '',
        xp : 0,
        init : function(config){
          Object.keys(config).forEach(function (property) {
              this[property] = config[property];
          }, this);
          this.xp = 0;
          this.id = getuid();
        },
        addXp : function (ammount) {
          this.xp = this.xp + ammount;
          return this;
        }
    }
});
