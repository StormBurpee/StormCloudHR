var Model = require('../model');

class Employee extends Model {
  constructor(rclient) {
    super(rclient);
  }

  getEmployees(company, db) {
    return new Promise((resolve, reject) => {
      this.rclient.hgetall('stormcellhr_employees_'+belongs, function(err, object) {
        if(object.employees != null) {
          resolve({rows: object.employees, redis: true});
        } else {
          db.query("SELECT * FROM employees WHERE belongs_to="+belongs, (err, rows) => {
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
