/**
 * Created by wcheng on 2017/6/10.
 */
(function(Fly){
  "use strict";
  var Bird = function(config) {
    this.img = config.img;
    this.ctx = config.ctx;
    this.imgW = this.img.width / 3;
    this.imgH = this.img.height;
    this.frameIndex = 0;
    this.x = 100;
    this.a = 0.0005;
    this.maxAngle = 45;
    this.maxSpeed = 0.3;
    this.curAngle = 0;
    this.speed = 0;
    this.y = 100;
  };
  Bird.prototype = {
    constructor : Bird,
    draw: function(delta) {
      this.speed = this.speed + this.a * delta;
      this.y += this.speed * delta + 1 / 2 * this.a * Math.pow(delta, 2);
      this.curAngle = this.speed / this.maxSpeed * this.maxAngle;
      if (this.curAngle > this.maxAngle) {
        this.curAngle = this.maxAngle;
      }else if(this.curAngle < -this.maxAngle) {
        this.curAngle = -this.maxAngle;
      }

      this.ctx.translate(this.x, this.y);
      this.ctx.rotate(Fly.toRadian(this.curAngle));
      this.ctx.drawImage(this.img, this.imgW * this.frameIndex++, 0, this.imgW, this.imgH, -1/2*this.imgW, -1/2*this.imgH, this.imgW, this.imgH);
      this.frameIndex %= 3;
    },
    changeSpeed: function(speed){
      this.speed = speed;
    }
  };
  Fly.Bird = Bird;
})(Fly);