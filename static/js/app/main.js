//
// Main
//
// ----------------------------------------------------------------------------

define([

  'jquery',
  'skrollr'
  //'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDdDJxZ9B35sIbBmn6MbqCWjXwHH2YCWYw&sensor=false'

], function($, skrollr) {

  // Set up a google map
  function initMap() {

    var $map = $('#map'),
      point  = new google.maps.LatLng(-37.4226104, 175.8031165),
      map    = new google.maps.Map($map[0], {

        center : point,
        zoom   : 12

      }),
      marker = new google.maps.Marker({

        position : point,
        map      : map,
        title    : 'Waihi Waterlily Gardens'

      });

  }

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


  function onDocReady() {

    //initMap();
    initForms();
    var s = skrollr.init({
      forceHeight: false
    });

  }

  $('document').ready(onDocReady);

});
