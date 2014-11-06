// Configure app loading
// ----------------------------------------------------------------------------

require.config({

  paths: {

    async   : '../bower_components/requirejs-plugins/src/async', // used for googlemap
    jquery  : '../bower_components/jquery/dist/jquery.min',      // apparently mandatory
    skrollr : '../bower_components/skrollr/dist/skrollr.min'     // gives us scrolly fun

  }

});

require([ 'app/main' ]);
