module.exports = function(app, settings) {

  // Index
  // --------------------------------------------------------------------------

  app.get('/', index);

  function index(req, res) {

    // Defult music sticky text
    res.locals.music = {
      track1 : '',
      track2 : '',
      track3 : ''
    };

    // Success: RSVP
    if (req.session && req.session.rsvped) {

      res.locals.rsvped = true;

    }

    // Success: Telegram
    if (req.session.telegramSent) {

      res.locals.telegramSent = true;

    }

    // Success: Music
    if (req.session.musicSent) {

      res.locals.musicSent = true;

    }

    // Error: rsvp empty
    if (req.session.rsvpErrorEmpty) {

      delete req.session.rsvpErrorEmpty;
      res.locals.rsvpErrorEmpty = true;

    }

    // Error: rsvp email
    if (req.session.rsvpErrorEmail) {

      delete req.session.rsvpErrorEmail;
      res.locals.rsvpErrorEmail = true;
      res.locals.rsvpMessage    = req.session.rsvpMessage;

    }

    // Error: telegram empty
    if (req.session.telegramErrorEmpty) {

      delete req.session.telegramErrorEmpty;
      res.locals.telegramErrorEmpty = true;

    }

    // Error: telegram email
    if (req.session.telegramErrorEmail) {

      delete req.session.telegramErrorEmail;
      res.locals.telegramErrorEmail = true;
      res.locals.telegramMessage    = req.session.telegramMessage;

    }

    // Error: music empty
    if (req.session.musicErrorEmpty) {

      delete req.session.musicErrorEmpty;
      res.locals.musicErrorEmpty = true;

    }

    // Error: music email
    if (req.session.musicErrorEmail) {

      delete req.session.musicErrorEmail;
      res.locals.musicErrorEmail = true;

      res.locals.music = {
        track1: req.session.music1,
        track2: req.session.music2,
        track3: req.session.music3
      };

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

      to      : settings.EMAIL_TO,
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

  // POST to /telegram
  // --------------------------------------------------------------------------

  app.post('/telegram', telegram);

  function telegram(req, res, next) {

    console.log(req.body);

    // Look out for empty submissions
    if (!req.body.telegramMessage || !req.body.telegramMessage.length) {

      req.session.telegramErrorEmpty = true;

      res.redirect('/#telegram');

      return;

    }

    // Otherwise, attempt a telegram email
    app.mailer.send('email-telegram', {

      to      : settings.EMAIL_TO,
      subject : 'TELEGRAM',
      message : req.body.telegramMessage,

    }, function(err) {

      // If something goes wrong, log the error and inform the user
      // Try to preserve the text they had sent
      if (err) {

        console.log('TELEGRAM error', err);

        req.session.telegramErrorEmail = true;
        req.session.telegramMessage    = req.body.telegramMessage;

      } else {

        req.session.telegramSent = true;

      }

      res.redirect('/#telegram');

    });

  }

  // POST to /music
  // --------------------------------------------------------------------------

  app.post('/music', music);

  function music(req, res, next) {

    console.log(req.body);

    var music1 = req.body['music-1'],
        music2 = req.body['music-2'],
        music3 = req.body['music-3'];

    // Look out for empty submissions
    if (!music1.length && !music2.length && !music3.length) {

      req.session.musicErrorEmpty = true;

      res.redirect('/#music');

      return;

    }

    // Otherwise, attempt a music email
    app.mailer.send('email-song', {

      to      : settings.EMAIL_TO,
      subject : 'MUSIC REQUEST',
      message : {
        track1 : music1,
        track2 : music2,
        track3 : music3
      }

    }, function(err) {

      // If something goes wrong, log the error and inform the user
      // Try to preserve the text they had sent
      if (err) {

        console.log('MUSIC error', err);

        req.session.musicErrorEmail = true;
        req.session.music1          = music1;
        req.session.music2          = music2;
        req.session.music3          = music3;

      } else {

        req.session.musicSent = true;

      }

      res.redirect('/#music');

    });

  }



  // GET to /testmail
  // --------------------------------------------------------------------------
  app.get('/testmail', function(req, res, next) {

    app.mailer.send('email-test', {

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
