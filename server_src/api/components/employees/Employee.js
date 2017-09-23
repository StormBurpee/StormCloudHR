var Model = require('../model');

class Employee extends Model {
  constructor(rclient, db) {
    super(rclient, db);
  }

  getEmployees(company) {
    let db = this.db;
    let rclient = this.rclient;
    return new Promise((resolve, reject) => {
      rclient.hgetall('stormcellhr_employees_'+company, function(err, object) {
        if(object != null && object.employees != null) {
          console.log("Received Employees from Redis Cache");
          console.log(object.employees);
          resolve(object.employees);
        } else {
          db.query("SELECT * FROM employees WHERE belongs_to="+company, (err, rows) => {
            console.log("Sending Request for employees to DB.");
            if(err)
              throw err;

            rclient.hmset("stormcellhr_employees_"+company, {
              employees: JSON.stringify(rows)
            });
            rclient.expire("stormcellhr_employees_"+company, 120);
            resolve(rows);
          });
        }
      });
    })
  }
}

module.exports = Employee;
