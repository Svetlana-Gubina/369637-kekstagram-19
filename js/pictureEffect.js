'use strict';
(function () {
  // Применение эффекта для изображения
  var DEFAULTVALUE = 1;
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
        result = 'grayscale(' + level + ')';
        break;
      case 'sepia':
        result = 'sepia(' + level + ')';
        break;
      case 'marvin':
        result = 'invert(' + (level * 100) + '%)';
        break;
      case 'phobos':
        result = 'blur(' + level * 3 + 'px)';
        break;
      case 'heat':
        result = 'brightness(' + level * 3 + ')';
        break;
    }
    return result;
  };

  var currentType;
  var currentLevel;

  var changeSliderHandler = function (level) {
    var effect = getEffect(currentType, level);
    imgPreview.style.filter = effect;
    imgPreview.style = 'display: flex; -webkit-box-align: center;-ms-flex-align: center; align-items: center; -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center; width: 600px; height: 600px; background-color: #ffffff;';
    imgPreview.children[0].style = 'max-width: 600px; max-height = 600px';
    effectValue.value = Math.round(level * 100);
    currentLevel = level;
  };

  var changeEffect = function (evt) {
    var input = evt.target;
    var type = input.value;
    currentType = type;
    changeSliderHandler(currentLevel);
    if (type === 'none') {
      window.utils.hide(sliderElement);
    } else {
      window.utils.show(sliderElement);
    }
    window.slider.setValue(DEFAULTVALUE, changeSliderHandler);
    imgPreview.classList = '.img-upload__preview';
    imgPreview.classList.add('effects__preview--' + type);
  };

  // Наложение эффекта на изображение
  effectsList.addEventListener('change', changeEffect);
  // Инициализация слайдера
  var effectLevelHandler = function () {
    window.slider.init(changeSliderHandler);
  };
  sliderElement.addEventListener('mousedown', effectLevelHandler);

  window.pictureEffect = {
    imgPreview: imgPreview,
    sliderElement: sliderElement,
    effectValue: effectValue,
    effectsList: effectsList
  };
})();
