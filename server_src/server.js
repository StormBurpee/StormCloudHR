var express       = require('express');
var redis         = require("redis");
var bluebird      = require('bluebird');
var mysql         = require('mysql');
var cors          = require('cors');
var Q             = require('q');
var passwordhash  = require('password-hash');
var bodyparser    = require('body-parser');
var cookieparser  = require('cookie-parser');
var crypto        = require('crypto');

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

app.use(cookieparser());
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

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
  let employee = new Employee(rclient, db, Q);
  let user = new User(rclient, db, Q, passwordhash, employee);
  if(request.body.email && request.body.password) {
    user.login(request.body.email, request.body.password).then(resp => {
      if(resp.error && resp.error == 1) {
        response.json(resp);
        return;
      } else {
        let hash = crypto.createHash("sha256");
        let userHash = hash.update(request.body.email + new Date()).digest('hex');
        let key = "stormcellhr_user_loggedin:"+userHash;
        console.log("User logged in with hash, " + key);
        rclient.set(key, request.body.email);
        rclient.expire(key, 1*60*60);
        response.cookie("user", userHash, {maxAge: 1*60*60});
        response.json({message: "User Login", user: resp, hash: userHash}).send();
      }
    });
  } else {
    response.json({error: 1, message: "Please supply Email and Password"});
  }
});

router.get("/user/byemail/:email", function(request, response) {
  let employee = new Employee(rclient, db, Q);
  let user = new User(rclient, db, Q, passwordhash, employee);
  if(request.params.email) {
    user.getUserByEmail(request.params.email).then(resp => {
      response.json({user: resp});
    });
  } else {
    response.json({user: null});
  }
});

router.get("/users/managers/:company", function(request, response) {
  let employee = new Employee(rclient, db, Q);
  let user = new User(rclient, db, Q, passwordhash, employee);
  if(request.params.company) {
    user.getUsersAboveLevel(request.params.company, 4).then(resp => {
      response.json({managers: resp});
    })
  } else {
    response.json({managers: null});
  }
});

router.get("/user/genpass/:password", function(request, response) {
  let pass = request.params.password;
  response.json({message: "Sneaky sneaky password generation", password: passwordhash.generate(pass)});
});

router.get("/user/register", function(request, response) {

});

router.get("/user/loggedin/:hash", function(request,response) {
  let employee = new Employee(rclient, db, Q);
  let user = new User(rclient, db, Q, passwordhash, employee);
  if(request.params.hash) {
    rclient.getAsync('stormcellhr_user_loggedin:'+request.params.hash).then(resp => {
      if(resp != null) {
        user.getUserByEmail(resp).then(res => {
          response.json({loggedin: true, user: res});
        });
      } else {
        response.json({loggedin: false});
      }
    });
  } else {
    response.json({loggedin: false});
  }
});

router.get("/user/refreshexpiry/:hash", function(request, response) {
  let hash = request.params.hash;
  rclient.getAsync("stormcellhr_user_loggedin:"+hash).then(resp => {
    if(resp) {
      rclient.set("stormcellhr_user_loggedin:"+hash, resp);
      rclient.expire("stormcellhr_user_loggedin:"+hash, 1*60*60);
      response.json({user: resp, message: "Refreshed Session For 60 Minutes."});
    } else {
      response.json({error: 1, message: "User is not logged in."});
    }
  });
});

router.get("/user/loggedin", function(request, response) {
  if(request.cookies.user) {
    rclient.getAsync('stormcellhr_user_loggedin:'+request.cookies.user).then(resp => {
      if(resp != null) {
        response.json({loggedin: true});
      } else {
        response.json({loggedin: false});
      }
    });
  } else {
    response.json({loggedin: false});
  }
});

app.use(cors(corsOptions));
app.use('/', router);
app.listen(port);
console.log("Server Initalized and Online.");
