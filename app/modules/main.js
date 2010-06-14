var log = require('fastjs/logger').getLogger('Main');

exports.index = function() {
  log.info("This is my index method, rendering a HAML template.");
  this.render_haml('index', {msg: 'Hello, World!'});
};