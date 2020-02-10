'use strict';
(function () {
  // Загрузка изображения и показ формы редактирования
  var inputUpload = document.querySelector('.img-upload__input');
  var upload = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var body = document.querySelector('body');
  var DEFAULTSCALE = 100;
  var reg = /\.(?:jpg|jpeg|gif|png)$/;
  var preview = document.querySelector('.img-upload__preview').firstElementChild;
  var minPreviews = document.querySelectorAll('.effects__preview');
  var scaleValue = document.querySelector('.scale__control--value');

  var escPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeUpload();
      body.classList.remove('modal-open');
    }
  };

  var closeUpload = function () {
    inputUpload.value = '';
    window.utils.hide(upload);
    document.removeEventListener('keydown', escPressHandler);
  };

  var openUpload = function () {
    window.utils.show(upload);
    scaleValue.value = DEFAULTSCALE + '%';
    window.utils.hide(window.pictureEffect.sliderElement);
    uploadCancel.addEventListener('click', closeUpload);
    document.addEventListener('keydown', escPressHandler);
  };

  inputUpload.addEventListener('change', function () {
    var file = inputUpload.files[0];
    var fileName = file.name.toLowerCase();
    if (reg.test(fileName)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
        minPreviews.forEach(function (item) {
          item.style.backgroundImage = 'url("' + reader.result + '")';
        });
      });
      reader.readAsDataURL(file);
    }
    openUpload();
  });

  window.upload = {
    scaleValue: scaleValue,
    DEFAULTSCALE: DEFAULTSCALE,
    escPressHandler: escPressHandler,
    closeUpload: closeUpload,
  };
})();
