// Configure app loading
// ----------------------------------------------------------------------------

require.config({

  paths: {

    async:  'libs/async',
    jquery: 'libs/jquery-1.11.0.min',

  }

});

require([ 'app/main' ]);
