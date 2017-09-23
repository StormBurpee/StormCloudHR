var Model = require('../model');

class User extends Model {
  constructor(rclient) {
    super(rclient);
    this.email = "";
    this.name = {first: "", last: ""};
    this.loggedin = false;
    this.companyId = -1;
  }
}

module.exports = User;
