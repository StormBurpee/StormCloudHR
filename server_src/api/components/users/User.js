var Model = require('../model');

class User extends Model {
  constructor(rclient, db, q, passwordhash, employeeRef) {
    super(rclient, db, q);
    this.passwordhash = passwordhash;
    this.employeeRef = employeeRef;

    this.employee = {};
    this.email = ""
    this.userlevel = 4; // 1 = owner, 2 = location manager, 3 = manager, 4 = employee
  }

  login(email, password) {
    let thisUser = this;
    return new Promise((reject, resolve) => {
      console.log("User " + email + " attempting login.");
      thisUser.db.query("SELECT * FROM users WHERE email='"+email+"'", (err, rows) => {
        if(rows.length > 0) {
          let user = rows[0];
          if(thisUser.passwordhash.verify(password, user.password)) {
            let actualUser = new User(thisUser.rclient, thisUser.db, thisUser.q, thisUser.passwordhash, thisUser.employeeRef);
            actualUser.email = email,
            actualUser.userlevel = user.user_level;
            thisUser.employeeRef.getEmployee(user.employee_id).then(resp => {
              actualUser.employee = resp;
              resolve(JSON.parse(JSON.stringify(actualUser)));
            });
          } else {
            resolve({error: 1, error_msg: "Wrong Password."})
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
