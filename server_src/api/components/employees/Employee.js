var Model = require('../model');

class Employee extends Model {
  constructor(rclient, db) {
    super(rclient, db);
  }

  getEmployees(company) {
    let db = this.db;
    return new Promise((resolve, reject) => {
      this.rclient.hgetall('stormcellhr_employees_'+company, function(err, object) {
        if(object != null && object.employees != null) {
          console.log("Received Employees from Redis Cache");
          resolve({rows: object.employees, redis: true});
        } else {
          db.query("SELECT * FROM employees WHERE company_to="+company, (err, rows) => {
            console.log("Sending Request for employees to DB.");
            if(err)
              throw err;

            this.rclient.hmset("stormcellhr_employees_"+company, {
              employees: rows
            });
            this.rclient.expire("stormcellhr_employees_"+company, 30);
            resolve({rows: rows, redis: false});
          });
        }
      });
    })
  }
}

module.exports = Employee;
