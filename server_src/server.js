var express   = require('express');
var redis     = require("redis");
var bluebird  = require('bluebird');
var mysql     = require('mysql');

var app = express();
var port = process.env.PORT || 3000;

var Model = require('./components/model');
var Employee = require('./components/Employee')

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
    response.json({message: "Employee List", rows: null});
    return;
  }

  let employee = new Employee(rclient, db);
  employee.getEmployees(belongs).then(resp => {
    response.json({message: "Employee List", rows: resp});
  });
});

app.use('/', router);
app.listen(port);
console.log("Server Initalized and Online.");
