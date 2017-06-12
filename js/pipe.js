/**
 * Created by wcheng on 2017/6/10.
 */
(function(Fly){
  "use strict";

  var Pipe = function(config) {
    this.imgTop = config.imgTop;
    this.imgBottom = config.imgBottom;
    this.ctx = config.ctx;
    this.x = config.x;
    this.pipeSpace = config.pipeSpace;
    this.imgW = this.imgTop.width;
    this.imgH = this.imgTop.height;
    this.topY = 0;
    this.bottomY = 0;
    this.speed = 0.1;
    this.initPipeHeight();
  };

  Pipe.prototype.draw = function(delta){
    this.x -= this.speed * delta;
    if(this.x <= -this.imgW * 3) {
      this.x += this.imgW * 3 * 6;
      this.initPipeHeight();
    }

    this.ctx.rect(this.x, this.topY, this.imgW, this.imgH);
    this.ctx.rect(this.x, this.bottomY, this.imgW, this.imgH);
    this.ctx.drawImage(this.imgTop, this.x, this.topY);
    this.ctx.drawImage(this.imgBottom, this.x, this.bottomY);
  };

  Pipe.prototype.initPipeHeight = function(){
    var pipeTopHeight = Math.random() * 200 + 50;
    this.bottomY = pipeTopHeight + this.pipeSpace;
    this.topY = pipeTopHeight - this.imgH;
  };

  Fly.Pipe = Pipe;
})(Fly);