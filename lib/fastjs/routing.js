function Router() {
  var _routes = [];
  
  this.route = function(match, mod, fn) {
    _routes.push({regex: new RegExp(match), module: mod, fn: fn});
  };
  
  this.match = function(path) {
    for(var x = 0; x < _routes.length; x++) {
      var route = _routes[x].regex;
      if(route.test(path)) {
        return _routes[x];
      }
    }
    return null;
  };
}

exports.load = function() {
  var router = new Router();
  
  var routes = require('../../app/config/routes');
  routes.configure(router);
  return router;
};