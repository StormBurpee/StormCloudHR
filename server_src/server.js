var express   = require('express');
var redis     = require("redis");
var bluebird  = require('bluebird');
var mysql     = require('mysql');

var app = express();
var port = process.env.PORT || 3000;

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
  if(belongs == null)
    response.json({message: "Employee List", rows: null});
  db.query("SELECT * FROM employees WHERE belongs_to="+belongs, (err, rows) => {
    if(err)
      throw err;

    response.json({message: "Employee List", rows: rows});
  });
});

app.use('/', router);
app.listen(port);
console.log("Server Initalized and Online.");