// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
 
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var fireworks = function(){
  "use strict";
  return {
    html : "<canvas id='fireworks' style='background:black;'></canvas>",
    init : function(){
      var canvas = $("#fireworks")[0];
      var context = canvas.getContext("2d");

      var w = $(canvas).width();
      var h = $(canvas).height();
      var dot = 2 * window.devicePixelRatio;

      function toX( x ){
        return ( w + ( ( (w/2) + ( x*dot ) ) | 0 ) ) % w;
      }
      function toY( y ){
        return ( h + ( ( (h/2) + ( y*dot ) ) | 0 ) ) % h;
      }

      context.fillStyle = "black";
      context.fillRect(0, 0, w, h);

      var lifeCycle = 100;

      function Walker( x, y, speed, modAngle, defaultAngle ){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.modAngle = modAngle;
        this.angle = defaultAngle;
        this.energy = this.refEnergy * 2;
        var colorRand = Math.random();
        var r = Math.round( Math.abs( ( 2*colorRand ) - 0.5 )     * 255 );
        var g = Math.round( Math.sin( Math.PI * colorRand )       * 255 );
        var b = Math.round( Math.cos( ( Math.PI/2 ) * colorRand ) * 255 );
        this.color = "rgb("+r+", "+g+", "+b+")";
        if( defaultAngle == null ){
          this.angle = Math.random()*Math.PI*2;
        }
      }

      Walker.prototype.refEnergy = lifeCycle;

      Walker.prototype.spawn = function( num, array ){
        console.log( num );
        var count = Math.floor( num );
        var odds = num - count;
        for( var i = 0; i < count; i ++ ){
          array.push( new Walker(  this.x, this.y, this.speed, Math.max( this.modAngle*0.9, 0.8 ), this.angle ) );
        }
        if( Math.random() - odds < 0 ){
          array.push( new Walker(  this.x, this.y, this.speed, Math.max( this.modAngle*0.9, 0.8  ), this.angle ) );
        }
      }

      Walker.prototype.draw = function(){
        context.fillStyle = this.color;
        this.angle += ( Math.random() - 0.5 )*this.modAngle;
        this.x += Math.cos( this.angle ) * (this.energy/this.refEnergy) * this.speed;
        this.y += Math.sin( this.angle ) * (this.energy/this.refEnergy) * this.speed;
        context.fillRect( toX( this.x ), toY( this.y ), dot, dot );
        if( this.energy > this.refEnergy * ( 3/2 ) ){
          this.energy -= 1.5;
        }else{
          this.energy -= 2.2;
        }
      }

      var walkers = [ new Walker( 0, 0, 1, 2 ) ];
      var it = 0;

      function drawWalkers(){
        context.fillStyle = "rgba(0,0,0,0.08)";
        context.fillRect(0, 0, w, h );
        it ++;
        if( it % lifeCycle === 0 ){
          var numWalkers = walkers.length;
          for( var i = 0; i < numWalkers; i ++ ){
            walkers[ i ].spawn( (0.8 * ( 2048/numWalkers )) - 0.999, walkers );
          }
          walkers.splice( 0, numWalkers );
        }
        if( walkers.length === 0 ){
          walkers = [ new Walker( 0, 0, 1, 2 ) ];
        }
        for( var i = 0; i < walkers.length; i ++ ){
          walkers[ i ].draw()
        }
        window.requestAnimationFrame( drawWalkers );
      };

      window.requestAnimationFrame( drawWalkers );
    }
  };

}();

demos.push( fireworks );