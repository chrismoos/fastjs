var Middleware = function() {
  var list = [
    'lib/fastjs/middleware/request_logging',
    'lib/fastjs/middleware/dispatch',
    'lib/fastjs/middleware/notfound'
  ];
  
  this.size = function() {
    return list.length;
  };
  
  this.get = function(x) {
    return list[x];
  };
};

exports.standard = function() {
  return new Middleware();
};