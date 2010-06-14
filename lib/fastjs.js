var sys = require('sys');
var log = require('./fastjs/logger').getLogger('fastjs');

var fastjs_settings = require('./fastjs/settings');
var fastjs_server = require('./fastjs/server');
var fastjs_middleware = require('./fastjs/middleware');

require.paths.push(process.cwd() + "/lib/");

var DEFAULT_SETTINGS = {
  'server.listenPort': 5000,
  'server.listenAddress': '0.0.0.0',
  'server.middleware': fastjs_middleware.standard(),
  'server.dir': process.cwd()
};

function bootstrap() {
  var settings = DEFAULT_SETTINGS;
  
  log.info("Bootstrapping fastjs application...");
  
  fastjs_settings.load(settings);
    
  log.info("Bootstrapped, starting server...");
  fastjs_server.start(settings);
}

bootstrap();