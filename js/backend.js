'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var TARGETURL = 'https://js.dump.academy/kekstagram';
  window.backend = {
    load: function (loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          try {
            loadHandler(xhr.response);
          } catch (err) {
            errorHandler('Извините, в данных ошибка, мы попробуем получить их ещё раз.');
          }
        } else {
          errorHandler(('Статус ответа: ' + xhr.status + ' ' + xhr.statusText));
        }
      });
      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      // отслеживаем процесс отправки
      // xhr.upload.addEventListener('progress', function (evt) {
      //   console.log('Отправлено' + evt.loaded + 'из' + evt.total);
      // });
      xhr.addEventListener('load', function () {
        return xhr.status === 200 ? loadHandler(xhr.response) : errorHandler();
      });
      xhr.addEventListener('error', function () {
        errorHandler('Произошла ошибка соединения');
      });
      xhr.open('POST', TARGETURL);
      xhr.send(data);
    },
  };
})();
