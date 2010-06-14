var sys = require('sys');

var Logger = function(name) {
  var level = {
    DEBUG: 'DEBUG',
    INFO: 'INFO',
    ERROR: 'ERROR',
    WARN: 'WARN'
  };
  
  function log(msg, level) {
    sys.log("[" + level + "]: " + name + " - " + msg);
  }
  
  this.info = function(msg) {
    log(msg, level.INFO);
  };
  
  this.debug = function(msg) {
    log(msg, level.DEBUG);
  };
  
  this.error = function(msg) {
    log(msg, level.ERROR);
  };
  
  this.warn = function(msg) {
    log(msg, level.WARN);
  };
};

exports.getLogger = function(name) {
  return new Logger(name);
};