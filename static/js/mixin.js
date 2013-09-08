_.mixin({

  // http://patik.com/blog/complete-cross-browser-console-log/
  log: function() {
    if (typeof console.log === 'function') {
      if ((Array.prototype.slice.call(arguments)).length === 1 && typeof Array.prototype.slice.call(arguments)[0] === 'string') {
        console.log( (Array.prototype.slice.call(arguments)).toString() );
      } else {
        console.log( Array.prototype.slice.call(arguments) );
      }
    } else if (!Function.prototype.bind && typeof console !== 'undefined' && typeof console.log === 'object') {
      Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
    }
  },

  l: function(message) {
    _.log(message);
  }

});
