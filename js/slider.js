'use strict';
(function () {
  var pin = document.querySelector('.effect-level__pin');
  var slider = document.querySelector('.effect-level__line');
  var depth = document.querySelector('.effect-level__depth');

  // Получение координат элемента относительно страницы
  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect(elem);
    return {
      left: box.left + pageXOffset,
    };
  };

  var setValue = function (value, callback) {
    var level = window.utils.clamp(value, 0, 1);
    var percent = level * 100;

    pin.style.left = percent + '%';
    depth.style.width = percent + '%';

    callback(level);
  };

  var init = function (callback) {
    var mouseMoveHandler = function (moveEvt) {
      var left = getCoords(slider).left;
      var value = (moveEvt.pageX - left) / slider.offsetWidth;

      setValue(value, callback);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();
      var left = getCoords(slider).left;
      var value = (upEvt.pageX - left) / slider.offsetWidth;

      setValue(value, callback);
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };
  window.slider = {
    setValue: setValue,
    init: init
  };
})();
