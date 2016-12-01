/*eslint-env node */

var express = require("express");
var fs = require("fs");
//var bodyParser = require('body-parser');




// load local json data
var locdata = require(__dirname+"/data/sfo.json");
var cfenv = require("cfenv");

var app = express();
// configure app to use bodyParser()
// this will let us get the data from a POST
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));


var appEnv = cfenv.getAppEnv();
//console.log(locdata);

// my customized routes
app.get("/sendResponse", function (req, res) {
  res.send("Hello World!");
});

app.get("/getweather", function (req, res) {
  var wdetail = locdata.weather;
  res.send({"weather":wdetail});
});

// expects a value url parameter
app.get("/weather/:country", function (req, res) {
  console.log(req.params.country);
  res.json({"success":"ok","weather":locdata.weather});
});

app.get("/etweather", function(req, res) {
   res.json({ countrygiven: req.query.country});
});

app.get("/wonderful", function(req, res) {
   res.json({ wonderful: "journey in bluemix world! hhhhhhhhhhhhhhhhhhhh!!"});
});

app.get("/wastedmytime", function(req, res) {
   res.json({ regret: "Literally wasted precious 6 months by not attending this session"});
});

app.get("/ennamacha", function(req, res) {
   res.json({ response: "Nothing much machi"});
});

app.get("/deploydaa", function(req, res) {
   res.json({ response: "No Da . Kabali Daaaaa!!!!!!!1"});
});

app.get("/crashmysystem", function(req, res) {
  process.exit();
});

// start server on the specified port and binding host
app.listen(appEnv.port, "0.0.0.0", function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
