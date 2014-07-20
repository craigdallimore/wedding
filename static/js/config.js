// Configure app loading
// ----------------------------------------------------------------------------

require.config({

  paths: {

    async   : '../bower_components/async/lib/async',         // used for googlemap
    jquery  : '../bower_components/jquery/dist/jquery.min',  // apparently mandatory
    skrollr : '../bower_components/skrollr/dist/skrollr.min' // gives us scrolly fun

  }

});

require([ 'app/main' ]);
