// Main
// ----------------------------------------------------------------------------

define([
  'jquery',
  'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyDdDJxZ9B35sIbBmn6MbqCWjXwHH2YCWYw&sensor=false'
], function($) {

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

  var view    = {},
    scrollers = [];

  function setViewDimensions() {

    view.width  = $(window).width();
    view.height = $(window).height();

  }

  function setViewScrollTop() {

    view.scrollTop = $(window).scrollTop();

  }

  function initScroller(selector) {

    var $decoration = $(selector),
      imgSrc        = $decoration.css('background-image'),
      topOffset     = $decoration.offset().top;
      height        = $decoration.height();

    $decoration.css('background-image', 'none');

    var $holder = $('<div>', {
      class: 'scroll-holder',
      width: view.width,
      height: height
    });

    $tile = $('<img>', {
      src: imgSrc.replace(/url\(|\)/g, '')
    });

    $holder.append($tile);

    $holder.insertBefore($('#main'));

    scrollers.push({

      $holder: $holder,
      $tile: $tile,
      topOffset: topOffset,
      bottomOffset: topOffset + height

    });

    // Thinky think.
    // 1. set up the scroller containers and scroll tiles.
    // 2. Make sure they recalc their values on resize and scroll
    // 3. Debounce resize.
    // 4. Calculate the width, scrolledness of the tiles on page load. Don't assume the page is at the top.

  }

  // Update Scroller
  // Sets the 3d transform of the scroller and visibility
  // --------------------------------------------------------------------------
  function updateScroller(scroller, scrollTop) {

    var topOffset = scroller.topOffset - scrollTop,
      bottomOffset = scroller.bottomOffset - scrollTop;

    if ( topOffset > view.height ) {
      scroller.$holder.css('visibility', 'hidden');
      return;
    }

    if ( bottomOffset < 0 ) {
      scroller.$holder.css('visibility', 'hidden');
      return;
    }


    console.log('IN VIEW');


    scroller.$holder.css({

      'visibility': 'visible',
      '-webkit-transform': 'translate3d(0, ' + topOffset + 'px, 0)',
      'transform': 'translate3d(0, ' + topOffset + 'px, 0)'

    });

    var imgTopOffset = (topOffset * 0.9) - 200;

    scroller.$tile.css({

      '-webkit-transform': 'translate3d(0, ' + imgTopOffset  + 'px, 0)',
      'transform': 'translate3d(0, ' + imgTopOffset + 'px, 0)'

    });

  }

  // Update scrollers
  // Sets the transform / vi
  // --------------------------------------------------------------------------
  function updateScrollers(fn, scrollTop) {

    for(var i = 0, l=scrollers.length; i < l; i++) {

      fn.call(null, scrollers[i], scrollTop);

    }

  }

  // OnScroll
  // --------------------------------------------------------------------------

  function onScroll() {

    setViewScrollTop();
    updateScrollers(updateScroller, view.scrollTop);

  }


  $('document').ready(function() {

    initMap();
    //setViewDimensions();
    //setViewScrollTop();
    //initScroller('#decoration-1');

    //updateScrollers(updateScroller, view.scrollTop);

    //$(window).on('scroll', onScroll);

  });

});
