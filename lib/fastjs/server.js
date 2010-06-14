var http = require('http');
var sys = require('sys');
var log = require('fastjs/logger').getLogger('fastjs.server');
var url = require('url');
var routing = require('fastjs/routing');

function runMiddleware(middleware, env) {
  var stop = false;
  
  for(var x = 0; x < middleware.size() && !stop; x++) {
    var name = middleware.get(x);
    var module = require(env['fastjs.settings']['server.dir'] + '/' + name);
    stop = module.call(env);
  }
  
  return stop;
}

function setup_env(settings, req, resp, router) {
  return {
    'fastjs.request': req,
    'fastjs.response': resp,
    'fastjs.settings': settings,
    'fastjs.path_info': url.parse(req.url, true),
    'fastjs.router': router
  };
}

http.ServerResponse.prototype.sendResponse = function(code, out, hdrs) {
  var headers = hdrs ? hdrs : {
    "Content-Type": "text/plain"
  };

  this.writeHead(code, headers);
  this.end(out);
};

exports.start = function(settings) {
  var middleware = settings['server.middleware'];
  var router = routing.load();
  
  http.createServer(function(req, resp) {
    var env = setup_env(settings, req, resp, router);    
    try {
      runMiddleware(middleware, env);
    }
    catch(err) {
      resp.sendResponse(500, ["500 Internal Server Error", "", err.stack].join("\n"));
    }
  }).listen(settings['server.listenPort'], settings['server.listenAddress']);

  log.info("listening on " + settings['server.listenAddress'] + ":" + settings['server.listenPort']);
};