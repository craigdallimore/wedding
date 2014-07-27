module.exports = function(app) {

  // Index
  // --------------------------------------------------------------------------

  app.get('/', index);

  function index(req, res) {

    if (req.session && req.session.rsvped) {
      // this doesn't work. Is there a problem with 'locals'?
      res.locals.rsvped = true;
    }

    res.render('index.jade', res.locals);

  }

  // POST to /rsvp
  // --------------------------------------------------------------------------

  app.post('/rsvp', rsvp);

  function rsvp(req, res, next) {

    console.log(req.body);

    // do some validation
    // what do we actually need in an rsvp?
    // - yes I'm going
    // - I've bringing (x) children

    req.session.rsvped = true;

    res.redirect('/#rsvp');

  }

  // GET to /testmail
  // --------------------------------------------------------------------------
  app.get('/testmail', function(req, res, next) {

    app.mailer.send('email', {

      to : 'decoy9697@gmail.com',
      subject : 'Test email',

    }, function(err) {

      if (err) {
        console.log(err);
        res.send('There was an error sending the email');
      }

      res.send('Email sent');

    });

  });

};
