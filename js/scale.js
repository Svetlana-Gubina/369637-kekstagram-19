'use strict';
(function () {
  var MINVALUE = 25;
  var STEP = MINVALUE;
  var stepUp = document.querySelector('.scale__control--bigger');
  var reduce = document.querySelector('.scale__control--smaller');
  var img = window.pictureEffect.imgPreview.children[0];

  var transformImg = function (num) {
    img.style = 'transform: scale(' + num / 100 + ')';
  };

  var reduceImg = function (evt) {
    evt.preventDefault();
    var num = parseInt(window.upload.scaleValue.value, 10);
    if (num > MINVALUE) {
      window.upload.scaleValue.value = num - STEP + '%';
      transformImg(num - STEP);
    }
  };

  var increaseImg = function (evt) {
    evt.preventDefault();
    var num = parseInt(window.upload.scaleValue.value, 10);
    if (num < window.upload.DEFAULTSCALE) {
      window.upload.scaleValue.value = num + STEP + '%';
      transformImg(num + STEP);
    }
  };

  reduce.addEventListener('click', reduceImg);
  stepUp.addEventListener('click', increaseImg);

  if (window.pictureEffect.imgPreview.classList.contains('hidden')) {
    reduce.removeEventListener('click', reduceImg);
    stepUp.removeEventListener('click', increaseImg);
  }

  window.scale = {
    transformImg: transformImg,
  };
})();
