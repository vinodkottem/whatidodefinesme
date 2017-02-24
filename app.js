/*eslint-env node */

var express = require("express");
var fs = require("fs");
var moment = require('moment-timezone');
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
  res.send("Hello Bluemix test!");
});


function datenewfunction(somedate){
	var day = moment.tz(somedate,"Asia/Kolkata");
	day.set('hour', moment().get('hour'));
	day.set('minute', moment().get('minute'));
	day.set('second', moment().get('second'));
	day.set('millisecond', moment().get('millisecond'));
	console.log("Current INDIADATE :"+moment().format()+" FormatedTo INDIADATE object :"+day.toDate());
	return day.toDate();
}


function datenew2function(somedate){
	var newdate = getCurrentDate();
	var modSome = new Date(somedate);
	modSome.setHours(newdate.getHours());
	modSome.setMinutes(newdate.getMinutes());
	modSome.setSeconds(newdate.getSeconds());
	return modSome;	
}

var getCurrentDate = function(){
    var today = new Date();		
	var localoffset = -(today.getTimezoneOffset()/60);
	var destoffset = +5.5;
	var offset = destoffset-localoffset;
	var CurrentDate = new Date( new Date().getTime() + offset * 3600 * 1000);
    return CurrentDate;
}

function dateoldfunction(somedate){
	var newdate = getCurrentDate();
	var modSome = new Date(somedate);
	var day = modSome.getDate();
	var mon = modSome.getMonth();
	var yyyy = modSome.getFullYear();
	newdate.setDate(day);
	newdate.setMonth(mon);
	newdate.setYear(yyyy);
	return newdate;	
}

app.get("/dateEating/:d", function (req, res) {
  console.log(req.params.d);
  var da = {"final":datenew2function(req.params.d),"momentissuedate": datenewfunction(req.params.d),"olddate":dateoldfunction(req.params.d),"serverdate":new Date(),"serverINDIA":getCurrentDate()};
  res.send(JSON.stringify(da));
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
   res.json({ wonderful: "journey in bluemix world!!!"});
});

app.get("/wastedmytime", function(req, res) {
   res.json({ regret: "Literally wasted precious 6 months by not attending this session jan 6 2017"});
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
