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

    return JSON.stringify(newEmployee);
  }

  toJSON() {
    let employee = this;
      return {
        first: employee.first,
        middle: employee.middle,
        last: employee.last,
        gender: employee.gender,
        birthday: employee.birthday,
        tfn: employee.birthday,
        account_name: employee.account_name,
        account_bsb: employee.account_bsb,
        account_number: employee.account_number,
        emc1_name: employee.emc1_name,
        emc1_relationship: employee.emc1_relationship,
        emc1_contact: employee.emc1_contact,
        emc2_name: employee.emc2_name,
        emc2_relationship: employee.emc2_relationship,
        emc2_contact: employee.emc2_contact,
        title: employee.title,
        location: employee.location,
        status: employee.status
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
          resolve(JSON.parse(object));
        } else {
          db.query("SELECT * FROM employees WHERE belongs_to="+company, (err, rows) => {
            console.log("Sending Request for employees to DB.");
            if(err)
              throw err;

            let returnEmployees = [];

            for(var i = 0; i < rows.length; i++) {
              let row = rows[i];
              let rEmp = employee.newReturnEmployee(row.first, row.middle, row.last, row.gender, row.birthday, row.tfn, row.account_name, row.account_bsb, row.account_number, row.emc1_name, row.emc1_relationship, row.emc1_contact, row.emc2_name, row.emc2_relationship, row.emc2_contact, null);
              returnEmployees.push( rEmp );
            }
            rclient.hmset("stormcellhr_employees_"+company, {
              employees: JSON.stringify(returnEmployees)
            });
            rclient.expire("stormcellhr_employees_"+company, 120);
            resolve(returnEmployees);
          });
        }
      });
    })
  }
}

module.exports = Employee;
