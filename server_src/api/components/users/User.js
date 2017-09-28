var Model = require('../model');

class User extends Model {
  constructor(rclient, db, q, passwordhash, employeeRef) {
    super(rclient, db, q);
    this.passwordhash = passwordhash;
    this.employeeRef = employeeRef;

    this.employee = {};
    this.email = ""
    this.userlevel = 4; // 0 = owner, 1 = admin, 2 = location manager, 3 = manager, 4 = employee
    this.debug_mode = false;
  }

  //TODO: ADD REDIS CACHE!
  getUserByEmail(email) {
    let thisUser = this;
    return new Promise((resolve, reject) => {
      thisUser.db.query("SELECT * FROM users WHERE email='"+email+"'", (err, rows) => {
        if (rows.length > 0) {
          let user = rows[0];
          let actualUser = new User(thisUser.rclient, thisUser.db, thisUser.q, thisUser.passwordhash, thisUser.employeeRef);
          actualUser.email = email,
          actualUser.userlevel = user.user_level;
          thisUser.employeeRef.getEmployee(user.employee_id, true).then(resp => {
            thisUser.debug("Retrieved employee of user.");
            actualUser.employee = resp[0];
            resolve(JSON.parse(JSON.stringify(actualUser)));
          });
        } else {
          resolve({});
        }
      });
    });
  }

  getUsersByLevel(belongsto, level) {

  }

  getUsersAboveLevel(belongsto, level) {
    let thisUser = this;
    return new Promise((resolve, reject) => {
      let promises = [];
      let users = [];
      thisUser.db.query("SELECT * FROM users WHERE user_level < "+level, (err, rows) => {
        if(rows && rows.length > 0) {
          for(let i = 0; i < rows.length; i++) {
            let user = rows[i];
            let actualUser = new User(thisUser.rclient, thisUser.db, thisUser.q, thisUser.passwordhash, thisUser.employeeRef);
            actualUser.email = user.email;
            actualUser.userlevel = user.user_level;
            promises.push(thisUser.employeeRef.getEmployee(user.employee_id).then(resp => {
              actualUser.employee = resp[0];
              if(resp[0].belongsto == belongsto) {
                users.push(actualUser);
              }
            }));
          }
        }
        thisUser.q.all(promises).done(function(values) {
          resolve(users);
        });
      });
    });
  }

  login(email, password) {
    let thisUser = this;
    return new Promise((resolve, reject) => {
      console.log("User " + email + " attempting login.");
      thisUser.db.query("SELECT * FROM users WHERE email='"+email+"'", (err, rows) => {
        if(rows.length > 0) {
          let user = rows[0];
          thisUser.debug("Found User");
          thisUser.debug(user);
          if(thisUser.passwordhash.verify(password, user.password)) {
            thisUser.debug("Password was verified");
            let actualUser = new User(thisUser.rclient, thisUser.db, thisUser.q, thisUser.passwordhash, thisUser.employeeRef);
            actualUser.email = email,
            actualUser.userlevel = user.user_level;
            thisUser.employeeRef.getEmployee(user.employee_id, true).then(resp => {
              thisUser.debug("Retrieved employee of user.");
              actualUser.employee = resp[0];
              resolve(JSON.parse(JSON.stringify(actualUser)));
            });
          } else {
            thisUser.debug("Password was incorrect");
            resolve({error: 1, error_msg: "Wrong Password."});
          }
        } else {
          resolve({error: 1, error_msg: "User with email '"+email+"' does not exist."});
        }
      });
    });
  }


  register(email, password, employeeid) {
    console.log("Attempting to register user: " + email);
  }

  toJSON() {
    let user = this;
    return {
      email: user.email,
      employee: user.employee,
      userlevel: user.userlevel
    }
  }
}

module.exports = User;
