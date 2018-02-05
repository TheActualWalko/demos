/* global demos  */

var welcome = function(){
  "use strict";
  return {
    html : "<canvas id='welcome'></canvas>",
    init : function(){
      var cnv = document.getElementById( 'welcome' );
      var ctx = cnv.getContext("2d");
      var width = cnv.width;
      var height = cnv.height;
      var pxScale = window.devicePixelRatio;

      var words = "welcome to the demos. click the arrows to navigate.".split(" ");
      var nextWord = words[0];
      var visibleWords = [ nextWord ];

      function drawNext(){
        ctx.fillStyle="#000";
        ctx.fillRect( 0, 0, width, height );
        ctx.fillStyle="#fff";
        ctx.font = ( pxScale * 12 ) + "px helvetica";
        ctx.textAlign = "center";
        ctx.fillText( visibleWords.join(" "), width / 2, height / 2 );
        if( visibleWords.length < words.length ){
          var waitTime = nextWord.length * 100;
          if( nextWord.indexOf(".") === nextWord.length - 1 ){
            waitTime += 500;
          }
          setTimeout( drawNext, waitTime );
          nextWord = words[ visibleWords.length ];
          visibleWords.push( nextWord );
        }
      }

      drawNext();

    }
  };
}();

demos.push(welcome);