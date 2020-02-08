'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');

  // Отрисовка сообщений успешной загрузки и ошибки запроса на основе шаблонов
  var closeMessage = function () {
    main.removeChild(main.lastChild);
    document.removeEventListener('keydown', ecapeCloseMessageHandler);
  };

  var ecapeCloseMessageHandler = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
      closeMessage();
    }
  };

  var rendererrorMessage = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    var errorFragment = document.createDocumentFragment();
    errorFragment.appendChild(error);
    main.appendChild(errorFragment);
    var errorMessage = document.querySelector('.error');
    return errorMessage;
  };
  var rendersuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var success = successTemplate.cloneNode(true);
    var successFragment = document.createDocumentFragment();
    successFragment.appendChild(success);
    main.appendChild(successFragment);
    var successMessage = document.querySelector('.success');
    return successMessage;
  };

  // Обработчики успшеой зарузки изображения и ошибки запроса
  var errorHandler = function () {
    window.upload.closeUpload();
    var message = rendererrorMessage();
    var errorButton = message.querySelector('.error__button');
    errorButton.addEventListener('click', closeMessage);
    document.addEventListener('keydown', ecapeCloseMessageHandler);
  };

  var successHandler = function () {
    window.upload.closeUpload();
    var message = rendersuccessMessage();
    var successButton = message.querySelector('.success__button');
    successButton.addEventListener('click', closeMessage);
    document.addEventListener('keydown', ecapeCloseMessageHandler);
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
    window.backend.save(new FormData(form), successHandler, errorHandler);
  });
})();
