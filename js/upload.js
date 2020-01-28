'use strict';
(function () {
  // Загрузка изображения и показ формы редактирования
  var inputUpload = document.querySelector('.img-upload__input');
  var upload = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('.img-upload__cancel');
  var body = document.querySelector('body');

  var closeUpload = function () {
    inputUpload.value = '';
    window.utils.hide(upload);
  };

  var openUpload = function () {
    window.utils.show(upload);
    window.utils.hide(window.pictureEffect.sliderElement);
    uploadCancel.addEventListener('click', closeUpload);
    body.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeUpload();
        body.classList.remove('modal-open');
      }
    });
  };

  inputUpload.addEventListener('change', openUpload);
})();
