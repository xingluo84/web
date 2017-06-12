/**
 * Created by wcheng on 2017/6/10.
 */
(function(Fly){
  "use strict";

  var Sky = function(config){
    this.img = config.img;
    this.ctx = config.ctx;
    this.imgW = this.img.width;
    this.x = config.x;
    this.y = 0;
    this.speed = 0.1;
  };
  Sky.prototype = {
    constructor: Sky,
    draw: function(delta) {
      this.x -= this.speed * delta;
      if(this.x <= -this.imgW) {
        this.x += this.imgW * 2;
      }
      this.ctx.drawImage(this.img, this.x, this.y);
    }
  };
  Fly.Sky = Sky;
})(Fly);