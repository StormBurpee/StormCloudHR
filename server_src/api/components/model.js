var Q = require('q');

class Model {
  constructor(rclient, db) {
    this.rclient = rclient;
    this.db = db;
  }
}

module.exports = Model;
