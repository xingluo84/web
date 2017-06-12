/**
 * Created by wcheng on 2017/6/10.
 */
(function(window){
  "use strict";
  var FlyObj = {};
  FlyObj.toRadian = function(angle){
    return angle / 180 * Math.PI;
  };
  FlyObj.loadImages = function(srcList, callback) {
    var count = 0,
        allLangth = srcList.length,
        imgsObj = {};
    srcList.forEach(function(srcStr) {
      var img = new Image();
      img.src = "./images/"+srcStr+".png";
      console.log(img);
      imgsObj[srcStr] = img;
      img.onload = function (){
        count++;
        if(count >= allLangth) {
          callback(imgsObj);
        }
      };
    })
  };
  window.Fly = FlyObj;
})(window);