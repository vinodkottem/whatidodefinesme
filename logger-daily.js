var winston     = require ('winston');
require('winston-daily-rotate-file');
var transports  = [];

transports.push(new winston.transports.DailyRotateFile({
  name: 'file',
  datePattern: '.yyyy-MM-ddTHH-mm',
  filename: "log_file.log"
}));

var logger = new winston.Logger({transports: transports});

module.exports = logger;
