'use strict';
(function () {
  var pictures = document.querySelector('.pictures');
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var userFotos = [];

  var renderUserFoto = function (foto) {
    var userPicture = userPictureTemplate.cloneNode(true);
    userPicture.addEventListener('click', function (evt) {
      window.main.pictureClickHandler(evt, foto);
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

  var successHandler = function (data) {
    userFotos = data;
    renderFotos(userFotos);
  };
  window.backend.load(successHandler, errorHandler);
})();
