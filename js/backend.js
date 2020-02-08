'use strict';
(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var TARGETURL = 'https://js.dump.academy/kekstagram';
  window.backend = {
    load: function (loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        return xhr.status === 200 ? loadHandler(xhr.response) : errorHandler(); // ('Статус ответа: ' + xhr.status + ' ' + xhr.statusText)
      });
      xhr.addEventListener('error', function () {
        errorHandler(); // ('Произошла ошибка соединения')
      });
      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, loadHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      xhr.addEventListener('load', function () {
        return xhr.status === 200 ? loadHandler(xhr.response) : errorHandler();
      });
      xhr.addEventListener('error', function () {
        errorHandler();
      });
      xhr.open('POST', TARGETURL);
      xhr.send(data);
    },
  };
})();
