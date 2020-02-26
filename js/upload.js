'use strict';
(function () {
  // Загрузка изображения и показ формы редактирования
  var DEFAULTSCALE = 100;
  var inputUpload = document.querySelector('.img-upload__input');
  var upload = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var reg = /\.(?:jpg|jpeg|gif|png)$/;
  var preview = document.querySelector('.img-upload__preview').firstElementChild;
  var minPreviews = document.querySelectorAll('.effects__preview');
  var scaleValue = document.querySelector('.scale__control--value');

  var resetParameters = function () {
    window.post.form.reset();
    window.post.submit.textContent = 'Опубликовать';
    window.pictureEffect.effectsList.querySelectorAll('.effects__radio')[0].checked = true;
    window.pictureEffect.imgPreview.style.filter = 'none';
    window.scale.transformImg(DEFAULTSCALE);
  };

  var escPressHandler = function (evt) {
    window.utils.isEscEvent(evt, closeUpload);
  };

  var closeUpload = function () {
    resetParameters();
    window.utils.hide(upload);
    document.body.classList.remove('modal-open');
    uploadCancel.removeEventListener('click', closeUpload);
    document.removeEventListener('keydown', escPressHandler);
  };

  var openUpload = function () {
    window.utils.show(upload);
    document.body.classList.add('modal-open');
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
      reader.addEventListener('error', function () {
        window.data.errorHandler('Ошибка загрузки. Пожалуйста, попробуйте еще раз.');
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
