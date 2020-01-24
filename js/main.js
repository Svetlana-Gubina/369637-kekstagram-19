'use strict';
(function () {
  // Service functions
  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomOfArray = function (arr) {
    var len = arr.length;
    var index = Math.floor(Math.random() * len);
    return arr[index];
  };

  // Элементы массива в случайном порядке
  var shuffle = function (arr) {
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  };

  var AVATARS = [1, 2, 3, 4, 5, 6];
  var URLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'];
  var DESRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  var RandomComment = function () {
    this.getMessage = function () {
      var randomMessage = getRandomOfArray(COMMENTS);
      var count = Math.round(Math.random());
      if (count === 0) {
        return randomMessage;
      } else {
        return randomMessage + ' ' + randomMessage;
      }
    };
    this.avatar = 'img/avatar-' + getRandomOfArray(AVATARS) + '.svg';
  };

  // Получение массива комментариев к фотографии
  var getComments = function () {
    var comments = [];
    for (var i = 0; i < getRandomInt(0, 100); i++) {
      comments.push(new RandomComment());
    }
    return comments;
  };

  // Объект "фотография пользователя" со свойствами "адрес" (url), "количество лайков", "количество комментариев" и "описание"
  var UserFotoObject = function (url) {
    this.url = 'photos/' + url + '.jpg';
    this.likes = getRandomInt(15, 200);
    this.commentsArray = getComments();
    this.comments = this.commentsArray.length;
    this.description = getRandomOfArray(DESRIPTIONS);
  };

  // Создаем массив объектов фотографий пользователей
  var userFotos = [];
  var randomUrls = shuffle(URLS);
  for (var i = 0; i < randomUrls.length; i++) {
    userFotos.push(new UserFotoObject(randomUrls[i]));
  }

  var pictures = document.querySelector('.pictures');
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderUserFoto = function (foto) {
    var userPicture = userPictureTemplate.cloneNode(true);
    userPicture.querySelector('.picture__img').src = foto.url;
    userPicture.querySelector('.picture__likes').textContent = foto.likes;
    userPicture.querySelector('.picture__comments').textContent = foto.comments;
    return userPicture;
  };

  var fragment = document.createDocumentFragment();
  for (var j = 0; j < userFotos.length; j++) {
    fragment.appendChild(renderUserFoto(userFotos[j]));
  }
  pictures.appendChild(fragment);
})();
