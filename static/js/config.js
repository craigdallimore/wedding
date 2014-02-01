// Configure app loading
// ----------------------------------------------------------------------------

require.config({

  paths: {

    underscore: 'libs/underscore-min',
    backbone:   'libs/backbone-min',
    marionette: 'libs/backbone.marionette.min',
    jquery:     'libs/jquery-2.1.0.min',

  },

  shim: {

    'underscore': { exports: '_' },
    'jquery':     { exports: '$' },
    'backbone':   { deps: ['underscore', 'jquery'], exports: 'Backbone' },
    'marionette': { deps: [ 'backbone' ], exports: 'Marionette' }

  }

});

require([ 'app/main' ]);
