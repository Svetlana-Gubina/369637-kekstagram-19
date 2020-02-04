'use strict';
(function () {
  var AVATARS = [1, 2, 3, 4, 5, 6];
  var URLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'];
  var DESRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

  var RandomComment = function () {
    this.getMessage = function () {
      var randomMessage = window.utils.getRandomOfArray(COMMENTS);
      var count = Math.round(Math.random());
      if (count === 0) {
        return randomMessage;
      } else {
        return randomMessage + ' ' + randomMessage;
      }
    };
    this.avatar = 'img/avatar-' + window.utils.getRandomOfArray(AVATARS) + '.svg';
  };

  // Получение массива комментариев к фотографии
  var getComments = function () {
    var comments = [];
    for (var i = 0; i < window.utils.getRandomInt(0, 100); i++) {
      comments.push(new RandomComment());
    }
    return comments;
  };

  // Объект "фотография пользователя" со свойствами "адрес" (url), "количество лайков", "количество комментариев" и "описание"
  var UserFotoObject = function (url) {
    this.url = 'photos/' + url + '.jpg';
    this.likes = window.utils.getRandomInt(15, 200);
    this.commentsArray = getComments();
    this.comments = this.commentsArray.length;
    this.description = window.utils.getRandomOfArray(DESRIPTIONS);
  };

  // Создаем массив объектов фотографий пользователей
  var userFotos = [];
  var randomUrls = window.utils.shuffle(URLS);
  for (var i = 0; i < randomUrls.length; i++) {
    userFotos.push(new UserFotoObject(randomUrls[i]));
  }

  var createSocialComment = function (comment) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    var paragraph = document.createElement('p');
    li.classList.add('social__comment');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = 'Аватар комментатора фотографии';
    img.width = 35;
    img.height = 35;
    paragraph.classList.add('social__text');
    paragraph.textContent = comment.getMessage();
    li.appendChild(img);
    li.appendChild(paragraph);
    return li;
  };

  var pictures = document.querySelector('.pictures');
  var userPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var pictureClickHandler = function (evt, foto) {
    var picture = evt.currentTarget;
    var body = document.querySelector('body');
    var bigPicture = document.querySelector('.big-picture');
    var url = picture.querySelector('.picture__img').src;
    var likesCount = picture.querySelector('.picture__likes').textContent;
    var commnetsCount = picture.querySelector('.picture__comments').textContent;
    var openbigPicture = function () {
      window.utils.show(bigPicture);
    };
    var hideBigPicture = function () {
      window.utils.hide(bigPicture);
    };
    var bigPictureEscPressHandler = function (keyEvt) {
      if (keyEvt.key === 'Escape') {
        hideBigPicture();
        body.classList.remove('modal-open');
      }
    };
    openbigPicture();
    body.classList.add('modal-open');
    bigPicture.querySelector('.big-picture__img').firstElementChild.src = url;
    bigPicture.querySelector('.likes-count').textContent = likesCount;
    bigPicture.querySelector('.comments-count').textContent = commnetsCount;
    bigPicture.querySelector('.social__caption').textContent = foto.description;

    var cancel = document.querySelector('.big-picture__cancel');
    cancel.addEventListener('click', hideBigPicture);
    document.addEventListener('keydown', bigPictureEscPressHandler);
    if (bigPicture.classList.contains('hidden')) {
      cancel.removeEventListener('click', hideBigPicture);
      document.removeEventListener('keydown', bigPictureEscPressHandler);
    }

    var pictureComments = foto.commentsArray;
    var socialComments = bigPicture.querySelector('.social__comments');
    var newFragment = document.createDocumentFragment();
    for (var f = 0; f < pictureComments.length; f++) {
      newFragment.appendChild(createSocialComment(pictureComments[f]));
    }
    socialComments.innerHTML = '';
    socialComments.appendChild(newFragment);
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    window.utils.hide(socialCommentCount);
    window.utils.hide(commentsLoader);
  };

  var renderUserFoto = function (foto) {
    var userPicture = userPictureTemplate.cloneNode(true);
    userPicture.addEventListener('click', function (evt) {
      pictureClickHandler(evt, foto);
    });
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
