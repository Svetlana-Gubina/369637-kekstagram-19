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

  var renderSocialComment = function (comment) {
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

  var pictureClickHandler = function (foto) {
    var bigPicture = document.querySelector('.big-picture');
    window.utils.show(bigPicture);
    bigPicture.querySelector('.big-picture__img').firstElementChild.src = foto.url;
    bigPicture.querySelector('.likes-count').textContent = foto.likes;
    bigPicture.querySelector('.comments-count').textContent = foto.commnets;
    bigPicture.querySelector('.social__caption').textContent = foto.description;
    var pictureComments = foto.commentsArray;
    var socialComments = bigPicture.querySelector('.social__comments');
    var newFragment = document.createDocumentFragment();
    for (var f = 0; f < pictureComments.length; f++) {
      newFragment.appendChild(renderSocialComment(pictureComments[f]));
    }
    socialComments.innerHTML = '';
    socialComments.appendChild(newFragment);
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');
    window.utils.hide(socialCommentCount);
    window.utils.hide(commentsLoader);
    var body = document.querySelector('body');
    body.classList.add('modal-open');
    bigPicture.querySelector('.cancel').addEventListener('click', function (CnacelEvt) {
      CnacelEvt.preventDefault();
      window.utils.hide(bigPicture);
      body.classList.remove('modal-open');
    });
    body.addEventListener('keydown', function (keyEvt) {
      keyEvt.preventDefault();
      if (keyEvt.key === 'Escape') {
        window.utils.hide(bigPicture);
        body.classList.remove('modal-open');
      }
    });
  };

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


  var findElem = function (pic, arr) {
    var reg = /photos\/[0-9]+(.jpg|jpeg)$/;
    var result = pic.src.match(reg);
    var index = arr.findIndex(function (element) {
      return element.url === result[0];
    });
    return arr[index];
  };

  pictures.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('picture')) {
      var picture = evt.target.firstElementChild;
      pictureClickHandler(findElem(picture, userFotos));
    } else if (evt.target.classList.contains('picture__img')) {
      var pic = evt.target;
      pictureClickHandler(findElem(pic, userFotos));
    }
  });
})();
