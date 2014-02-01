module.exports = function(app) {

  // Index
  // --------------------------------------------------------------------------

  app.get('/', index);

  function index(req, res) {

    res.render('index.jade');

  }

};
