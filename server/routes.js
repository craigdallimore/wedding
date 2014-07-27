module.exports = function(app, settings) {

  // Index
  // --------------------------------------------------------------------------

  app.get('/', index);

  function index(req, res) {

    // Success
    if (req.session && req.session.rsvped) {

      res.locals.rsvped = true;

    }

    // Error: empty
    if (req.session.rsvpErrorEmpty) {

      delete req.session.rsvpErrorEmpty;
      res.locals.rsvpErrorEmpty = true;

    }

    // Error: email
    if (req.session.rsvpErrorEmail) {

      delete req.session.rsvpErrorEmail;
      res.locals.rsvpErrorEmail = true;
      res.locals.rsvpMessage    = req.session.rsvpMessage;

    }

    res.render('index.jade', res.locals);

  }

  // POST to /rsvp
  // --------------------------------------------------------------------------

  app.post('/rsvp', rsvp);

  function rsvp(req, res, next) {

    console.log(req.body);

    // Look out for empty submissions
    if (!req.body.rsvpMessage || !req.body.rsvpMessage.length) {

      req.session.rsvpErrorEmpty = true;

      res.redirect('/#rsvp');

      return;

    }

    // Otherwise, attempt an rsvp email
    app.mailer.send('email-rsvp', {

      to      : settings.EMAIL_USER,
      subject : 'RSVP email',
      message : req.body.rsvpMessage,

    }, function(err) {

      // If something goes wrong, log the error and inform the user
      // Try to preserve the text they had sent
      if (err) {

        console.log('RSVP email error', err);

        req.session.rsvpErrorEmail = true;
        req.session.rsvpMessage    = req.body.rsvpMessage;

      } else {

        req.session.rsvped = true;

      }

      res.redirect('/#rsvp');

    });

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
