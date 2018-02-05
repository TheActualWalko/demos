/* global demos */

var demoMargin = 400;
var demoWidth = 600;
var demoHeight = 400;
var activeDemoIndex = 0;

$(function(){
  "use strict";
  
  function appendDemo( demo, index ){
    var demoHTML = $( demo.html );
    demoHTML.css( {
      'margin-top'  : ( -1*demoHeight / 2 ) + "px",
      'transform' : 'scale(' + 1/window.devicePixelRatio + ')',
      'transform-origin' : '0 0'
    } ).attr(
      'width',  demoWidth * window.devicePixelRatio
    ).attr(
      'height', demoHeight * window.devicePixelRatio
    ).attr(
      'data-index', index
    ).addClass("d_e_m_o");
    $("body").append( demoHTML );
    updateDemos();
  }
  
  function runDemo( demo ){
    demo.init();
  }

  function updateDemos(){
    $(".d_e_m_o").each( function(){
      var index = $(this).attr('data-index');
      var newLeftMargin = ( -1*demoWidth / 2 ) + ( ( index - activeDemoIndex ) * ( demoWidth + demoMargin ) ) + "px";
      $(this).css( {
        'margin-left' : newLeftMargin,
        'opacity'     : 1 / ( 1 + Math.abs( index - activeDemoIndex ) )
      } );
    });
    runDemo( demos[ activeDemoIndex ] );
  }

  demos.forEach( appendDemo );

  $("#prev").click(function(){
    activeDemoIndex = Math.max( 0, activeDemoIndex - 1 );
    updateDemos();
  });

  $("#next").click(function(){
    activeDemoIndex = Math.min( demos.length - 1, activeDemoIndex + 1 );
    updateDemos();
  });

});