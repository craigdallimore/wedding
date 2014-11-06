//
// Main
//
// ----------------------------------------------------------------------------

define('gmaps', ['async!https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDdDJxZ9B35sIbBmn6MbqCWjXwHH2YCWYw&sensor=false'], function() {

    return window.google.maps;

});

define([

  'jquery',
  'skrollr',
  'gmaps'

], function($, skrollr, gmaps) {

  // Set up a google map
  function initMap() {

    var $map = $('#map'),
      point  = new gmaps.LatLng(-37.4226104, 175.8031165),
      map    = new gmaps.Map($map[0], {

        center : point,
        zoom   : 12

      }),
      marker = new gmaps.Marker({

        position : point,
        map      : map,
        title    : 'Waihi Waterlily Gardens'

      });

  }

/*
  function onSubmitRsvp(e) {

    e.preventDefault();

    var $form     = $(e.target),
        $spinner  = $form.find('.spinner'),
        $textarea = $form.find('textarea'),
        $prompts  = $form.find('.prompt'),
        $button   = $form.find('[type="submit"]');


    // Do some preliminary validation
    $prompts.remove();

    if (!$textarea.val()) {
      $textarea.before('<span class="prompt">Looks like your message has nothing in it.</span>');
      return;
    }

    // Set inflight state
    $button.attr('disabled', true);
    $spinner.show();
    $.ajax({
      url  : '/api/rsvp',
      type : 'POST',
      data : $textarea.val()
    }).then(function(response) {
      console.log('resp', response);
    }, function(err) {
      console.log('err', err);
    });

  }

  // Initialise the forms
  function initForms() {

    var $formRsvp     = $('#form-rsvp'),
        $formTelegram = $('#form-telegram'),
        $formMusic    = $('#form-music');

    $formRsvp
      .on('submit', onSubmitRsvp)
      .find('[required]')
      .removeAttr('required');

  }
*/
  var $body = $('body');

  function toggleSecondaryNav() {

    $body.toggleClass('secondary-nav-visible');

  }

  function initSecondaryNav() {

    var $btn = $('#btn-toggle-nav'),
        $nav  = $('#secondary-navigation');

    $btn.on('click', toggleSecondaryNav);
    $nav.on('click', 'a', toggleSecondaryNav);

  }


  function onDocReady() {

    initMap();
    initSecondaryNav();
    //initForms();
    if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
      var s = skrollr.init({
        forceHeight: false
      });
    }

  }

  $('document').ready(onDocReady);

});
