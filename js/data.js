'use strict';
(function () {
  var pictures = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var userFotos = [];

  var renderUserFoto = function (foto) {
    var userPicture = userPictureTemplate.cloneNode(true);
    userPicture.addEventListener('click', function (evt) {
      window.picture.pictureClickHandler(evt, foto);
    });
    userPicture.querySelector('.picture__img').src = foto.url;
    userPicture.querySelector('.picture__likes').textContent = foto.likes;
    userPicture.querySelector('.picture__comments').textContent = foto.comments.length;
    return userPicture;
  };

  var renderFotos = function (fotos) {
    var fragment = document.createDocumentFragment();
    for (var j = 0; j < fotos.length; j++) {
      fragment.appendChild(renderUserFoto(fotos[j]));
    }
    pictures.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Порядок сортирвки фотографий пользователей
  var OrderTypeToNumber = {
    def: 0,
    random: 1,
    discussed: 2,
  };

  var successHandler = function (data) {
    userFotos = data;
    var order = OrderTypeToNumber.def;
    updatePictures(order);
    return true;
  };
  window.backend.load(successHandler, errorHandler);
  if (successHandler) {
    filters.classList.remove('img-filters--inactive');
  }

  // Фильтрация фотографий пользователей
  var compareCommentsLength = function (a, b) {
    return a.comments.length > b.comments.length ? -1 : 1;
  };

  var filterButtons = document.querySelectorAll('.img-filters__button');
  // Добавление класса active кнопке
  var activateButton = function (btn) {
    btn.classList.add('img-filters__button--active');
  };
  var inactivateButton = function (btn) {
    btn.classList.remove('img-filters__button--active');
  };

  var setActiveFilterButton = function (filterButton) {
    Array.from(filterButtons).forEach(function (btn) {
      inactivateButton(btn);
    });
    activateButton(filterButton);
  };
  var defButton = document.querySelector('#filter-default');
  var randomButton = document.querySelector('#filter-random');
  var discussedButton = document.querySelector('#filter-discussed');

  // Функция удаления отображенных элементов
  var updatePictures = function (order) {
    if (order === OrderTypeToNumber.random) {
      return renderFotos(window.utils.shuffle(userFotos.slice(0, 10)));
    } else if (order === OrderTypeToNumber.discussed) {
      return renderFotos(userFotos.slice().sort(compareCommentsLength));
    }
    return renderFotos(userFotos);
  };

  var removePictures = function () {
    var renderedPictures = document.querySelectorAll('.picture');
    Array.from(renderedPictures).forEach(function (item) {
      item.remove();
    });
  };

  filters.addEventListener('click', window.debounce(function (evt) {
    var target = evt.target;
    setActiveFilterButton(target);
    removePictures();
    var order;
    if (target === defButton) {
      order = OrderTypeToNumber.def;
    } else if (target === randomButton) {
      order = OrderTypeToNumber.random;
    } else if (target === discussedButton) {
      order = OrderTypeToNumber.discussed;
    }
    updatePictures(order);
  }));

  window.data = {
    errorHandler: errorHandler,
  };
})();
