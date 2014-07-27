//
// Express 4.0 starter application
// http://scotch.io/bar-talk/expressjs-4-0-new-features-and-upgrading-from-3-0
//
// This starts a node webserver on either port 3000 or a number given
// in the environments PORT variable.
//
// View templates are written in Jade
// http://jade-lang.com/
//
// Routes are imported from server/routes.js

// Set up
// ----------------------------------------------------------------------------
var express    = require('express'),
  bodyParser   = require('body-parser'),
  session      = require('express-session'),
  cookieParser = require('cookie-parser'),
  morgan       = require('morgan'),                     // request logger
  mailer       = require('express-mailer'),
  compression  = require('compression'),
  errorHandler = require('errorhandler'),
  settings     = require('./settings'),
  app          = express(),
  env          = process.env.NODE_ || 'development',
  port         = settings.PORT;

// Configuration
// ----------------------------------------------------------------------------

app.set('views', __dirname + '/server/views/');
app.set('view engine', 'jade');

// Gzip all the things
app.use(compression());

// Needs a cookie parser for the session to work
app.use(cookieParser());

// Set up a session
app.use(session({
  cookie            : {},
  secret            : settings.SESSION_SECRET,
  saveUninitialized : true,
  resave            : true
}));

// Don't tell them who you are
app.disable('x-powered-by');

// Cache the things
var oneYear = 31557600000;

// Parse request bodies
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.use(express.static(__dirname + '/',       { maxAge: oneYear }));
app.use(express.static(__dirname + '/static', { maxAge: oneYear }));

if (env === 'development') {

  app.use(morgan('dev'));
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));

} else {

  app.use(morgan());
  app.use(errorHandler());

}

// Routes
// ----------------------------------------------------------------------------
require('./server/routes')(app);

// Mailer setup
// ----------------------------------------------------------------------------
mailer.extend(app, {
  from             : 'wedding@fionaandcraig.com',
  host             : settings.EMAIL_HOST,
  secureConnection : true,
  port             : 465,
  transportMethod  : 'SMTP',
  auth : {
    user : settings.EMAIL_USER,
    pass : settings.EMAIL_PASSWORD
  }
});

// Launch express
// ----------------------------------------------------------------------------
var server = app.listen(port);
console.log('----------------------------------');
console.log('Node server listening on port ' + port);

// Kaizen
