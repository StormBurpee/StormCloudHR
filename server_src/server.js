var express       = require('express');
var redis         = require("redis");
var bluebird      = require('bluebird');
var mysql         = require('mysql');
var cors          = require('cors');
var Q             = require('q');
var passwordhash  = require('password-hash')

var app = express();
var port = process.env.PORT || 3000;
var corsOptions = {
  origin: "*"
}

//TODO: add an autoloader for models
var Model     = require('./api/components/model');
var Employee  = require('./api/components/employees/Employee');
var User      = require('./api/components/users/User');

var db = mysql.createConnection({
  host: "104.197.10.100",
  user: "stormcloudhr",
  password: "stormcloud123",
  database: "stormcloudhr_default"
});

console.log("Starting server initalization.");
db.connect((err) => {
  if(err)
    throw err;
  console.log("Connected to MySQL Database.");
});

var redisConnection = {ip: "127.0.0.1", port: "6379"};

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var rclient = redis.createClient(redisConnection.port, redisConnection.ip);
console.log("Connected to Redis Cache/Database.");

rclient.hmset('StormCellHR', {
  "version": "0.0.1",
  "author": "StormCellHR (A StormConsolidated Division)"
});

var router = express.Router();

router.get('/', function(request, response) {
  rclient.hgetall('StormCellHR', function(err, object) {
    response.json({message: "StormCellHR API", available_routes: "NA", redis: object});
  });
});

router.get('/employees/:belongsto', function(request, response) {
  let belongs = request.params.belongsto;
  if(belongs == null) {
    response.json({message: "Employee List", employees: null});
    return;
  }

  let employee = new Employee(rclient, db, Q);
  employee.getEmployees(belongs).then(resp => {
    response.json({message: "Employee List", employees: resp});
  });
});

router.get('/locations/:belongsto', function(request, response) {
  let belongs = request.params.belongsto;
  if(belongs == null) {
    response.json({message: "Location List", locations: null});
    return;
  }

  //TODO: Factor into a location class, same thing with jobs
  let employee = new Employee(rclient, db, Q);
  employee.getLocations(belongs).then(resp => {
    response.json({message:" Location List", locations: resp});
  });
});

router.get('/employee/:id', function(request, response) {
  let id = request.params.id;
  if(id == null) {
    response.json({message: "Employee", employee: null});
    return;
  }

  let employee = new Employee(rclient, db, Q);
  employee.getEmployee(id).then(resp => {
    response.json({message: "Employee", employee: resp});
    return response;
  });
});

router.post('/employees/new', function(request, response) {
  if(request.body.selfservice) {

  } else {

  }
});

router.post("/user/login", function(request, response) {

});

router.get("/user/genpass/:password", function(request, response) {
  let pass = request.params.password;
  response.json({message: "Sneaky sneaky password generation", password: passwordhash.generate(pass)});
});

router.get("/user/register", function(request, response) {

});

app.use(cors(corsOptions));
app.use('/', router);
app.listen(port);
console.log("Server Initalized and Online.");
