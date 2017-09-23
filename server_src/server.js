var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var redis = require("redis");
var bluebird = require('bluebird');

var redisConnection = {ip: "127.0.0.1", port: "6379"};

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);
var rclient = redis.createClient(redisConnection.port, redisConnection.ip);

rclient.hmset('StormCellHR', {
  "version": "0.0.1",
  "author": "StormCellHR (A StormConsolidated Division)"
});

var router = express.Router();

router.get('/', function(request, response) {
  rclient.hgetall('StormCellHR', function(err, object) {
    response.json({message: "StormCellHR API", available_routes: "NA", redis: object});
  });
})

app.use('/', router);
app.listen(port);
