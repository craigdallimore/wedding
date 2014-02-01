// Set up
// ----------------------------------------------------------------------------
var express = require('express'),
  app       = express(),
  port      = process.env.PORT || 3000;

// Configuration
// ----------------------------------------------------------------------------
app.configure(function() {

  app.use(express.static(__dirname + '/'));
  app.use(express.static(__dirname + '/static'));
  app.set('views', __dirname + '/server/views/');
  app.use('view engine', 'jade');

});

app.configure('development', function() {

  app.use(express.logger('dev'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

app.configure('production', function() {

  app.use(express.logger());
  app.use(express.errorHandler());

});

// Routes
// ----------------------------------------------------------------------------
require('./server/routes')(app);

// Launch
// ----------------------------------------------------------------------------
app.listen(port);
console.log('Node server listening on port ' + port);

