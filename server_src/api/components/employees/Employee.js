var Model = require('../model');

class Employee extends Model {
  constructor(rclient, db) {
    super(rclient, db);
    this.first = "";
    this.middle = "";
    this.last = "";
    this.gender = "";
    this.birthday = "";
    this.tfn = "";
    this.account_name = "";
    this.account_bsb = "";
    this.account_number = "";
    this.emc1_name = "";
    this.emc1_relationship = "";
    this.emc1_contact = "";
    this.emc2_name = "";
    this.emc2_relationship = "";
    this.emc2_contact = "";

    // Job Details
    this.title = "Title Placeholder";
    this.location = "Location Placeholder";
    this.status = "Full Time";
  }

  newReturnEmployee(first, middle, last, gender, birthday, tfn, account_name, account_bsb, account_number, emc1_name, emc1_relationship, emc1_contact, emc2_name, emc2_relationship, emc2_contact, jobdetails) {
    let newEmployee = new Employee(this.rclient, this.db);
    newEmployee.first = first;
    newEmployee.middle = middle;
    newEmployee.last = last;
    newEmployee.gender = gender;
    newEmployee.birthday = birthday;
    newEmployee.tfn = tfn;
    newEmployee.account_name = account_name;
    newEmployee.account_bsb = account_bsb;
    newEmployee.account_number = account_number;
    newEmployee.emc1_name = emc1_name;
    newEmployee.emc1_relationship = emc1_relationship;
    newEmployee.emc1_contact = emc1_contact;
    newEmployee.emc2_name = emc2_name;
    newEmployee.emc2_relationship = emc2_relationship;
    newEmployee.emc2_contact = emc2_contact;

    // Job Details
    newEmployee.title = "Title Placeholder";
    newEmployee.location = "Location Placeholder";
    newEmployee.status = "Full Time";

    console.log(JSON.stringify(newEmployee));
    return JSON.stringify(newEmployee);
  }

  toJSON() {
      return {
        first: this.first,
        middle: this.middle,
        last: this.last,
        gender: this.gender,
        birthday: this.birthday,
        tfn: this.birthday,
        account_name: this.account_name,
        account_bsb: this.account_bsb,
        account_number: this.account_number,
        emc1_name: this.emc1_name,
        emc1_relationship: this.emc1_relationship,
        emc1_contact: this.emc1_contact,
        emc2_name: this.emc2_name,
        emc2_relationship: this.emc2_relationship,
        emc2_contact: this.emc2_contact,
        title: this.title,
        location: this.location,
        status: this.status
      }
  }

  getEmployees(company) {
    let db = this.db;
    let rclient = this.rclient;
    let employee = this;
    return new Promise((resolve, reject) => {
      rclient.hgetall('stormcellhr_employees_'+company, function(err, object) {
        if(object != null && object.employees != null) {
          console.log("Received Employees from Redis Cache");
          resolve(employee.newReturnEmployee(object.employees.first, object.employees.middle, object.employees.last, object.employees.gender, object.employees.birthday, object.employees.tfn, object.employees.account_name, object.employees.account_bsb, object.employees.account_number, object.employees.emc1_name, object.employees.emc1_relationship, object.employees.emc1_contact, object.employees.emc2_name,
            object.employees.emc2_relationship, object.employees.emc2_contact, null));
        } else {
          db.query("SELECT * FROM employees WHERE belongs_to="+company, (err, rows) => {
            console.log("Sending Request for employees to DB.");
            if(err)
              throw err;
            let rEmp = employee.newReturnEmployee(rows.first, rows.middle, rows.last, rows.gender, rows.birthday, rows.tfn, rows.account_name, rows.account_bsb, rows.account_number, rows.emc1_name, rows.emc1_relationship, rows.emc1_contact, rows.emc2_name, rows.emc2_relationship, rows.emc2_contact, null);
            rclient.hmset("stormcellhr_employees_"+company, {
              employees: JSON.stringify(rEmp)
            });
            rclient.expire("stormcellhr_employees_"+company, 120);
            resolve(rEmp);
          });
        }
      });
    })
  }
}

module.exports = Employee;
