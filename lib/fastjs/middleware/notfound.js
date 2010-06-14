var sys = require('sys');

exports.call = function(env) {
  env['fastjs.response'].sendResponse(404, "404 Not Found: " + env['fastjs.path_info'].pathname);
  return false;
};