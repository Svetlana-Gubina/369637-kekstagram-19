'use strict';
(function () {
  window.utils = {
    show: function (elem) {
      elem.classList.remove('hidden');
    },

    hide: function (elem) {
      elem.classList.add('hidden');
    },

    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomOfArray: function (arr) {
      var len = arr.length;
      var index = Math.floor(Math.random() * len);
      return arr[index];
    },

    shuffle: function (arr) {
      var j;
      var temp;
      for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
      }
      return arr;
    },
    // Ограничение диапазона//
    clamp: function (value, min, max) {
      if (value < min) {
        return min;
      }

      if (value > max) {
        return max;
      }

      return value;
    },
    // Массив неповторяющихся элементов//
    unique: function (arr) {
      var obj = {};
      for (var v = 0; v < arr.length; v++) {
        var str = arr[v];
        obj[str] = true; // запомнить строку в виде свойства объекта
      }
      return Object.keys(obj);
    },
  };
})();

