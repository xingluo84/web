/**
 * Created by wcheng on 2017/6/10.
 */
(function(Fly){
  "use strict";

  var Game = function(config) {
    this.imgsArr = ["birds", "land", "pipe1", "pipe2", "sky"];
    this.isStart = true;
    this.delta = 0;
    this.lastFrameTime = new Date();
    this.curFrameTime = 0;
    this.roles = [];
    this.hero = null;
    this.createCanvas(config.id);
  };

  Game.prototype = {
    constructor: Game,

    start: function(){
      var that = this;
      Fly.loadImages(this.imgsArr, function(imgList) {
        that.initRols(imgList);
        that.render(imgList);
        that.bindEvent();
      });
    },

    initRols: function(imgList) {
      var context = this.ctx;
      var i;
      var imgSky = imgList.sky;
      var imgLand = imgList.land;

      this.hero = new Fly.Bird({
        img: imgList.birds,
        ctx: context
      });

      for(i = 0; i < 2; i++) {
        var sky = new Fly.Sky({
          img: imgSky,
          ctx: context,
          x : i * imgSky.width
        });
        this.roles.push(sky);
      }

      for(i = 0; i < 6; i++) {
        var pipe = new Fly.Pipe({
          imgTop: imgList.pipe2,
          imgBottom: imgList.pipe1,
          ctx: context,
          x: 300 + i * imgList.pipe1.width * 3,
          pipeSpace: 150
        });
        this.roles.push(pipe);
      }

      for(i = 0; i < 4; i++){
        var land = new Fly.Land({
          img: imgLand,
          ctx: context,
          x: i * imgLand.width,
          y: imgSky.height - imgLand.height
        });
        this.roles.push(land);
      }
    },

    bindEvent: function(){
      var that = this;
      that.ctx.canvas.addEventListener("click", function(){
        that.hero.changeSpeed(-0.3);
      });
    },

    render: function(imgList) {
      var that = this;
      var context = that.ctx;
      var bird = that.hero;
      var cvW = context.canvas.width;
      var cvH = context.canvas.height;
      var imgSky = imgList.sky;
      var imgLand = imgList.land;


      (function renderGame(){
        context.save();
        context.clearRect(0, 0, cvW, cvH);
        context.beginPath();

        that.curFrameTime = new Date();
        that.delta = that.curFrameTime - that.lastFrameTime;
        that.lastFrameTime = that.curFrameTime;

        that.roles.forEach(function(role) {
          role.draw(that.delta);
        });
        bird.draw(that.delta);
        if(bird.y <= 0 || bird.y >= (imgSky.height - imgLand.height) || context.isPointInPath(bird.x, bird.y)) {
          that.isStart = false;
        }

        context.restore();
        if(that.isStart) {
          requestAnimationFrame(renderGame);
        }
      })();
    },

    createCanvas: function(id) {
      var cv = document.createElement("canvas");
      cv.height = 600;
      cv.width = 800;
      cv.style.border = "1px solid #999";
      var container = document.getElementById(id) || document.body;
      container.appendChild(cv);
      this.ctx = cv.getContext("2d");
    }
  };

  Fly.Game = Game;
})(Fly);