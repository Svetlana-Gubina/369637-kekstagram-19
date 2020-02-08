'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');
  var successButton = document.querySelector('.success__button');
  var successMessage = document.querySelector('.success');
  var errorButton = document.querySelector('.error__button');
  var errorMessage = document.querySelector('.error');

  // Отрисовка сообщений успешной загрузки и ошибки запроса на основе шаблонов
  var rendererrorMessage = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    var errorFragment = document.createDocumentFragment();
    errorFragment.appendChild(error);
    main.appendChild(errorFragment);
  };
  var rendersuccessMessage = function () {
    var successTemplate = document.getElementById('success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var successFragment = document.createDocumentFragment();
    successFragment.appendChild(success);
    main.appendChild(successFragment);
  };

  // Обработчики успшеой зарузки изображения и ошибки запроса
  var errorHandler = function () {
    window.upload.closeUpload();
    rendererrorMessage();
    // document.addEventListener('keydown', onPopupEscPress);
    errorButton.addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.tagName === 'button') {
        window.utils.hide(errorMessage);
      }
    });
  };

  var successHandler = function () {
    window.upload.closeUpload();
    rendersuccessMessage();
    // document.addEventListener('keydown', onPopupEscPress);
    successButton.addEventListener('click', function () {
      window.utils.hide(successMessage);
    });
  };

  form.addEventListener('submit', function (evt) {
    // Каждый раз, когда пользователь пытается отправить данные, мы проверяем
    // валидность полей
    var inputIsValid = window.validation.checkInput(window.validation.inputHashtags);
    var textareaIsValid = window.validation.checkInput(window.validation.comment);
    if (!inputIsValid || !textareaIsValid) {
      evt.preventDefault();
    }
    evt.preventDefault();
    console.log(successButton);
    console.log(errorButton);
    // window.backend.save(new FormData(form), successHandler, errorHandler);
  });
})();
