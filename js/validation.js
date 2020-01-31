'use strict';
(function () {
  var inputHashtags = document.querySelector('input[name="hashtags"]');
  var comment = document.querySelector('.text__description');

  var CustomValidation = function (validityChecks) {
    this.invalidities = [];
    this.validityChecks = validityChecks;
  };

  CustomValidation.prototype = {
    addInvalidity: function (message) {
      this.invalidities.push(message);
    },
    getInvalidities: function () {
      return this.invalidities.join('\n');
    },
    checkValidity: function (param) {
      this.invalidities = [];
      for (var b = 0; b < this.validityChecks.length; b++) {
        var isInvalid = this.validityChecks[b].isInvalid(param);
        if (isInvalid) {
          this.addInvalidity(this.validityChecks[b].invalidityMessage);
        }
      }
    }
  };

  var deleteDoubleHashtags = function (str) {
    var value = str.trim();
    if (value === '') {
      return [];
    }
    return window.utils.unique(str.split(' '));
  };

  // Validity Checks Methods
  var misMatch = function (str) {
    return !str.match(/#.*/);
  };

  var isTooLong = function (str) {
    return str.length > 20;
  };

  var isTooShort = function (str) {
    return str.length < 2;
  };


  // Validity Checks//
  var inputHashtagsValidityChecks = [
    {
      isInvalid: function (hashtags) {
        return hashtags.length > 5;
      },
      invalidityMessage: 'Нельзя указать больше пяти хэш-тегов!'
    },
    {
      isInvalid: function (hashtags) {
        return hashtags.some(misMatch);
      },
      invalidityMessage: 'Хэштег должен начинаться с символа "#"!'
    },
    {
      isInvalid: function (hashtags) {
        return hashtags.some(isTooLong);
      },
      invalidityMessage: 'Хэштег должен содержать не более 20ти символов!'
    },
    {
      isInvalid: function (hashtags) {
        return hashtags.some(isTooShort);
      },
      invalidityMessage: 'Хэштег должен содержать не менее 2х символов'
    }
  ];


  var commentValidityChecks = [
    {
      isInvalid: function (textarea) {
        return textarea.value.length > 140;
      },
      invalidityMessage: 'Длина комментария не может составлять больше 140 символов'
    },
  ];

  inputHashtags.CustomValidation = new CustomValidation(inputHashtagsValidityChecks);
  comment.CustomValidation = new CustomValidation(commentValidityChecks);


  var checkInput = function (input) {
    if (input === inputHashtags) {
      var hashtags = deleteDoubleHashtags(inputHashtags.value);
    }
    input.CustomValidation.checkValidity(hashtags || input);
    if (input.CustomValidation.invalidities.length !== 0) {
      input.style.outline = '2px solid red';
      var message = input.CustomValidation.getInvalidities();
      input.setCustomValidity(message);
    } else {
      input.style.outline = 'none';
      input.setCustomValidity('');
    }
  };

  inputHashtags.addEventListener('input', function () {
    checkInput(inputHashtags);
  });

  comment.addEventListener('input', function () {
    checkInput(comment);
  });

  // Form
  var form = document.querySelector('.img-upload__form');

  form.addEventListener('submit', function (evt) {
    // Каждый раз, когда пользователь пытается отправить данные, мы проверяем
    // валидность полей
    evt.preventDefault();
  });

})();
