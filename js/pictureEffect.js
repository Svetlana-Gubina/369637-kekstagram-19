'use strict';
(function () {
  // Применение эффекта для изображения
  var imgPreview = document.querySelector('.img-upload__preview');
  var effectsList = document.querySelector('.effects__list');
  var sliderElement = document.querySelector('.effect-level');
  var effectValue = document.querySelector('.effect-level__value');

  // Функция изменении уровня интенсивности эффекта
  var getEffect = function (currentType, level) {
    var result;
    switch (currentType) {
      case 'none':
        result = 'none';
        break;
      case 'chrome':
        result = 'grayscale(' + (level * 0.01) + ')';
        break;
      case 'sepia':
        result = 'sepia(' + (level * 0.01) + ')';
        break;
      case 'marvin':
        result = 'invert(' + level + '%)';
        break;
      case 'phobos':
        result = 'blur(' + level * 0.01 * 3 + 'px)';
        break;
      case 'heat':
        result = 'brightness(' + level * 0.01 * 3 + ')';
        break;
    }
    return result;
  };

  var currentType;
  var currentLevel;

  var changeSliderHandler = function (level) {
    console.log('level: ' + level);
    // var effect = getEffect(currentType, level);
    // imgPreview.style.filter = effect;
    // effectValue.value = level;
    // currentLevel = level;
  };

  var changeEffect = function (evt) {
    var input = evt.target;
    var type = input.value;
    currentType = type;

    changeSliderHandler(currentLevel);

    imgPreview.classList = '.img-upload__preview';
    imgPreview.classList.add('effects__preview--' + input.value);
    if (type === 'none') {
      window.utils.hide(sliderElement);
    } else {
      window.utils.show(sliderElement);
    }
  };

  // Наложение эффекта на изображение
  effectsList.addEventListener('change', changeEffect);
  // Инициализация слайдера
  var effectLevelHandler = function () {
    window.slider.initSlider(changeSliderHandler);
  };
  sliderElement.addEventListener('mousedown', effectLevelHandler);

  window.pictureEffect = {
    sliderElement: sliderElement,
  };
})();
