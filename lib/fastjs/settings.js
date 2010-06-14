var log = require('fastjs/logger').getLogger('fastjs.settings');
var sys = require('sys');

exports.load = function(settings) {
  log.info("Loading settings...");
  
  try {
    var user_settings = require('../../app/config/settings');
    user_settings.configure(settings);
    log.info("User settings loaded.");
  }
  catch(error) {
    log.error("Unable to load settings, using defaults: " + error);
  }
  
  log.debug("\n" + sys.inspect(settings));
}