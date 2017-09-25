class Model {
  constructor(rclient, db, q) {
    this.rclient = rclient;
    this.db = db;
    this.q = q;
    this.debug_mode = false;
  }

  debug(message) {
    if(this.debug_mode)
      console.log(message);
  }
}

module.exports = Model;
