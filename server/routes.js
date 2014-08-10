module.exports = function(app, settings) {

  function existy(x)  { return x != null; }
  function lengthy(x) { return existy(x) && existy(x.length) && x.length > 0; }
  function truthy(x)  { return (x !== false) && existy(x); }

  // Index
  // --------------------------------------------------------------------------

  app.get('/', index);

  function index(req, res) {

    // RSVP
    // ------------------------------------------------------------------------

    // Success: RSVP
    if (req.session && req.session.rsvped) {

      res.locals.rsvped = true;

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

    // TELEGRAM
    // ------------------------------------------------------------------------

    // Success: Telegram
    if (req.session.telegramSent) {

      res.locals.telegramSent = true;

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

    // MUSIC
    // ------------------------------------------------------------------------
    function localify(fieldName) {
      if(lengthy(req.session[fieldName])) {
        res.locals.music[fieldName] = req.session[fieldName];
      }
    }

    // Music default
    res.locals.music = {
      music1    : '',
      music2    : '',
      music3    : '',
      musicName : ''
    };

    // Attempt to preserve state.
    ['music1', 'music2', 'music3', 'musicName'].forEach(localify);

    // Success: Music
    if (req.session.musicSent) {

      res.locals.musicSent = true;

    }

    // Error: music empty
    if (req.session.musicErrorEmpty) {

      delete req.session.musicErrorEmpty;
      res.locals.musicErrorEmpty = true;

    }

    // Error: name empty
    if (req.session.musicErrorNameEmpty) {

      delete req.session.musicErrorNameEmpty;
      res.locals.musicErrorNameEmpty = true;

    }

    // Error: music email
    if (req.session.musicErrorEmail) {

      delete req.session.musicErrorEmail;
      res.locals.musicErrorEmail = true;

    }

    console.log('locals', res.locals);

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

  //
  // conditions to try
  // no music, no name: nameerror and musicerror
  // no music: music error (name preserved)
  // no name: name error (music preserved)
  // music and name: submission
  //
  app.post('/music', music);

  function music(req, res, next) {

    console.log('BODY', req.body);

    // If it has length and it was submitted, add it too the session
    function sessionify(fieldName) {
      if(lengthy(req.body[fieldName])) {
        req.session[fieldName] = req.body[fieldName];
      }
    }

    var music1    = req.body.music1,
        music2    = req.body.music2,
        music3    = req.body.music3,
        musicName = req.body.musicName;

    // Attempt to preserve state.
    ['music1', 'music2', 'music3', 'musicName'].forEach(sessionify);

    // Look out for empty submissions
    if (!lengthy(music1) && !lengthy(music2) && !lengthy(music3)) {

      console.log('NO MUSIC');
      req.session.musicErrorEmpty = true;

      res.redirect('/#music');

      return;

    }

    // Look out for missing names
    if (!lengthy(musicName)) {

      console.log('NO NAME');
      req.session.musicErrorNameEmpty = true;

      res.redirect('/#music');

      return;

    }

    // Otherwise, attempt a music email
    app.mailer.send('email-music', {

      to      : settings.EMAIL_TO,
      subject : 'MUSIC REQUEST',
      message : {
        music1    : music1,
        music2    : music2,
        music3    : music3,
        musicName : musicName
      }

    }, function(err) {

      // If something goes wrong, log the error and inform the user
      // Try to preserve the text they had sent
      if (err) {

        console.log('MUSIC error', err);
        req.session.music1          = music1;
        req.session.music2          = music2;
        req.session.music3          = music3;
        req.session.musicName       = musicName;
        req.session.musicErrorEmail = true;

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
