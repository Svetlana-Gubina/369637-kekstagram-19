'use strict';
(function () {
  // Загрузка изображения и показ формы редактирования
  var inputUpload = document.querySelector('.img-upload__input');
  var upload = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var body = document.querySelector('body');
  var DEFAULTSCALE = 100;
  var scaleValue = document.querySelector('.scale__control--value');

  var uploadEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeUpload();
      body.classList.remove('modal-open');
    }
  };

  var closeUpload = function () {
    inputUpload.value = '';
    window.utils.hide(upload);
    document.removeEventListener('keydown', uploadEscPressHandler);
  };

  var openUpload = function () {
    window.utils.show(upload);
    scaleValue.value = DEFAULTSCALE + '%';
    window.utils.hide(window.pictureEffect.sliderElement);
    uploadCancel.addEventListener('click', closeUpload);
    document.addEventListener('keydown', uploadEscPressHandler);
  };

  inputUpload.addEventListener('change', function () {
    openUpload();
  });

  window.upload = {
    scaleValue: scaleValue,
    DEFAULTSCALE: DEFAULTSCALE,
    uploadEscPressHandler: uploadEscPressHandler,
  };
})();
