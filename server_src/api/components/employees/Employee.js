var Model = require('../model');

class Employee extends Model {
  constructor(rclient, db, q) {
    super(rclient, db, q);
    this.id = 0;
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
    this.email = "";
    this.jobdetails = {};
    this.address = {}
    this.mobile = "";
    this.work_mobile = "";
    this.work_email = "";
    this.debug_mode = true;
  }

  getEmploymentType(employment_type) {
    let types = ["Full Time", "Part Time", "Casual", "Temp", "Intern", "Volunteer", "Contactor"];
    return types[employment_type];
  }

  getPayType(pay_type) {
    let types = ["Year", "Quarter", "Month", "Fortnight", "Week", "Day", "Hour"];
    return types[pay_type];
  }

  getPayFrequency(pay_frequency) {
    let types = ["Annually", "Monthly", "Semimonthly", "BiWeekly", "Weekly", "Daily"];
    return types[pay_frequency];
  }

  newReturnEmployee(id, first, middle, last, email, gender, mobile, work_mobile, work_email, birthday, tfn, account_name, account_bsb, account_number, emc1_name, emc1_relationship, emc1_contact, emc2_name, emc2_relationship, emc2_contact, jobdetails, address) {
    let newEmployee = new Employee(this.rclient, this.db);
    newEmployee.id = id;
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
    newEmployee.email = email;
    newEmployee.address = address;

    // Job Details
    newEmployee.jobdetails = jobdetails;

    newEmployee.mobile = mobile;
    newEmployee.work_mobile = work_mobile;
    newEmployee.work_email = work_email;

    return newEmployee;
  }

  toJSON() {
    let employee = this;
      return {
        id: employee.id,
        first: employee.first,
        middle: employee.middle,
        last: employee.last,
        email: employee.email,
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
        jobdetails: employee.jobdetails,
        address: employee.address,
        mobile: employee.mobile,
        work_mobile: employee.work_mobile,
        work_email: employee.work_email
      }
  }

  getJDLocation(id, jobdetails) {
    let employee = this;
    employee.debug("Getting Location");
    employee.debug("Location ID: " + id);
    return new Promise((resolve, reject) => {
      employee.db.query("SELECT * FROM locations WHERE location_id="+id, (err, rows) => {
        let row = rows[0];
        employee.debug("Found Location: ");
        employee.debug(row);
        jobdetails.location = {
          location_name: row.name,
          address: row.address,
          country: row.country,
          state: row.state,
          city: row.city,
          postcode: row.postal_code
        };
        resolve( jobdetails );
      });
    });
  }

  getEmployee(id) {
    let db = this.db;
    let rclient = this.rclient;
    let employee = this;
    return new Promise((resolve, reject) => {
      rclient.hgetall('stormcellhr_employee_'+id, function(err, object) {
        if(object != null && object.employee != null) {
          console.log("Received Employee #"+id+" From Redis Cache.");
          resolve(JSON.parse(object.employee));
        } else {
          db.query("SELECT * FROM employees WHERE employee_id="+id, (err, rows) => {
            console.log("Sending Request for Employee #"+id+" to DB.");
            if(err)
              throw err;

            let returnEmployees = [];
            let row = rows[0];
            db.query("SELECT * FROM job_details WHERE employee_id="+id, (err, rows) => {
              let jobdetails = {};
              let promises = [];
              for(var j = 0; j < rows.length; j++) {
                let job = rows[j];
                jobdetails = {
                  title: job.job_title,
                  location: {},
                  department: job.department_id,
                  status: employee.getEmploymentType(job.employment_type),
                  manager: "Propagate("+job.manager_id+")",
                  pay_rate: job.pay_rate,
                  pay_currency: job.pay_currency,
                  pay_type: employee.getPayType(job.pay_type),
                  pay_frequency: employee.getPayFrequency(job.pay_frequency),
                  commision: job.commision,
                  bonus_structure: job.bonus_structure
                }
                promises.push(employee.getJDLocation(job.location_id, jobdetails));
              }
              let address = {
                line1: row.address_line_1,
                line2: row.address_line_2,
                country: row.address_country,
                state: row.address_state,
                city: row.address_city,
                postcode: row.address_post_code
              }
              employee.debug(promises);
              employee.q.all(promises).done(function(values) {
                employee.debug("settled");
                employee.debug(values);
                let rEmp = employee.newReturnEmployee(row.employee_id, row.first, row.middle, row.last, row.email, row.gender, row.mobile, row.work_mobile, row.work_email, row.birthdate, row.tfn, row.account_name, row.account_bsb, row.account_number, row.emc1_name, row.emc1_relationship, row.emc1_contact, row.emc2_name, row.emc2_relationship, row.emc2_contact, jobdetails, address);
                returnEmployees.push(rEmp);
                rclient.hmset("stormcellhr_employee_"+id, {
                  employee: JSON.stringify(returnEmployees)
                });
                rclient.expire("stormcellhr_employee_"+id, 240);
                resolve(returnEmployees);
              });
            });
          });
        }
      });
    });
  }

  getEmployees(company) {
    let db = this.db;
    let rclient = this.rclient;
    let employee = this;
    return new Promise((resolve, reject) => {
      rclient.hgetall('stormcellhr_employees_'+company, function(err, object) {
        if(object != null && object.employees != null) {
          console.log("Received Employees from Redis Cache");
          resolve(JSON.parse(object.employees));
        } else {
          db.query("SELECT * FROM employees WHERE belongs_to="+company, (err, rows) => {
            console.log("Sending Request for employees to DB.");
            if(err)
              throw err;

            let returnEmployees = [];

            for(var i = 0; i < rows.length; i++) {
              let row = rows[i];
              let jobdetails = {};
              let erows = rows.length;
              db.query("SELECT * FROM job_details WHERE employee_id="+row.employee_id, (err, rows) => {
                let jobdetails = {};
                let promises = [];
                for(var j = 0; j < rows.length; j++) {
                  let job = rows[j];
                  jobdetails = {
                    title: job.job_title,
                    location: {},
                    department: job.department_id,
                    status: employee.getEmploymentType(job.employment_type),
                    manager: "Propagate("+job.manager_id+")",
                    pay_rate: job.pay_rate,
                    pay_currency: job.pay_currency,
                    pay_type: employee.getPayType(job.pay_type),
                    pay_frequency: employee.getPayFrequency(job.pay_frequency),
                    commision: job.commision,
                    bonus_structure: job.bonus_structure
                  }
                  promises.push(employee.getJDLocation(job.location_id, jobdetails));
                }
                let address = {
                  line1: row.address_line_1,
                  line2: row.address_line_2,
                  country: row.address_country,
                  state: row.address_state,
                  city: row.address_city,
                  postcode: row.address_post_code
                }
                employee.debug(promises);
                employee.q.all(promises).done(function(values) {
                  employee.debug("settled");
                  employee.debug(values);
                  let rEmp = employee.newReturnEmployee(row.employee_id, row.first, row.middle, row.last, row.email, row.gender, row.mobile, row.work_mobile, row.work_email, row.birthdate, row.tfn, row.account_name, row.account_bsb, row.account_number, row.emc1_name, row.emc1_relationship, row.emc1_contact, row.emc2_name, row.emc2_relationship, row.emc2_contact, jobdetails, address);
                  returnEmployees.push(rEmp);
                  employee.debug(returnEmployees.length + " " + erows.length);
                  if(returnEmployees.length == erows.length) {
                    rclient.hmset("stormcellhr_employees_"+company, {
                      employee: JSON.stringify(returnEmployees)
                    });
                    rclient.expire("stormcellhr_employees_"+company, 240);
                    resolve(returnEmployees);
                  }
                });
              });
            }

          });
        }
      });
    })
  }
}

module.exports = Employee;
