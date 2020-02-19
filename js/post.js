'use strict';
(function () {
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');
  var submit = form.querySelector('.img-upload__submit');

  // Отрисовка сообщений успешной загрузки и ошибки запроса на основе шаблонов
  var closeMessage = function () {
    main.removeChild(main.lastChild);
    document.removeEventListener('keydown', ecapeCloseMessageHandler);
  };

  var ecapeCloseMessageHandler = function (evt) {
    evt.preventDefault();
    window.utils.isEscEvent(evt, closeMessage);
  };

  var renderMessage = function (result) {
    var template = document.querySelector('#' + result).content.querySelector('.' + result);
    var content = template.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(content);
    main.appendChild(fragment);
    var message = document.querySelector('.' + result);
    return message;
  };

  // Обработчики успшеой зарузки изображения и ошибки запроса
  var submitHandler = function (result) {
    window.upload.closeUpload();
    var message = renderMessage(result);
    var closeButton = message.querySelector('.' + result + '__button');
    message.addEventListener('click', closeMessage);
    closeButton.addEventListener('click', closeMessage);
    document.addEventListener('keydown', ecapeCloseMessageHandler);
  };

  var errorHandler = function () {
    submitHandler('error');
  };

  var successHandler = function () {
    submitHandler('success');
  };

  var progressHandler = function () {
    submit.textContent = 'Отправка...';
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
    window.backend.save(new FormData(form), successHandler, progressHandler, errorHandler);
  });

  window.post = {
    form: form,
    submit: submit,
  };
})();
