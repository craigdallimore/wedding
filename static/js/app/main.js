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


  function onDocReady() {

    //initMap();
    var s = skrollr.init({
      forceHeight: false
    });

  }

  $('document').ready(onDocReady);

});
