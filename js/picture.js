'use strict';
(function () {
  var createSocialComment = function (comment) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    var paragraph = document.createElement('p');
    li.classList.add('social__comment');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;
    paragraph.classList.add('social__text');
    paragraph.textContent = comment.message;
    li.appendChild(img);
    li.appendChild(paragraph);
    return li;
  };

  var pictureClickHandler = function (evt, foto) {
    var picture = evt.currentTarget;
    var bigPicture = document.querySelector('.big-picture');
    var url = picture.querySelector('.picture__img').src;
    var likesCount = picture.querySelector('.picture__likes').textContent;
    var openbigPicture = function () {
      window.utils.show(bigPicture);
      document.body.classList.add('modal-open');
    };
    var hideBigPicture = function () {
      window.utils.hide(bigPicture);
      document.body.classList.remove('modal-open');
    };
    var bigPictureEscPressHandler = function (keyEvt) {
      window.utils.isEscEvent(keyEvt, hideBigPicture);
    };
    openbigPicture();
    bigPicture.querySelector('.big-picture__img').firstElementChild.src = url;
    bigPicture.querySelector('.likes-count').textContent = likesCount;
    bigPicture.querySelector('.social__caption').textContent = foto.description;

    var cancel = document.querySelector('.big-picture__cancel');
    cancel.addEventListener('click', hideBigPicture);
    document.addEventListener('keydown', bigPictureEscPressHandler);
    if (bigPicture.classList.contains('hidden')) {
      cancel.removeEventListener('click', hideBigPicture);
      document.removeEventListener('keydown', bigPictureEscPressHandler);
    }

    var pictureComments = foto.comments.slice();
    var socialComments = bigPicture.querySelector('.social__comments');
    var socialCommentCount = bigPicture.querySelector('.social__comment-count');

    var renderComments = function () {
      var count = 0;
      var newFragment = document.createDocumentFragment();
      while (pictureComments.length > 0 && count < 5) { // добавляем не более пяти комментариев
        var element = createSocialComment(pictureComments[0]);
        newFragment.appendChild(element);
        count++;
        pictureComments.shift();
      }
      socialComments.appendChild(newFragment);
      // В блоке .social__comment-count показывается актуальное количество отрисованных комментариев и полное количество комментариев
      socialCommentCount.textContent = socialComments.childNodes.length + ' из ' + foto.comments.length + ' комментариев';
    };

    socialComments.innerHTML = '';
    renderComments();

    var commentsLoader = bigPicture.querySelector('.comments-loader');
    if (foto.comments.length > 5) {
      window.utils.show(commentsLoader);
    } else {
      window.utils.hide(commentsLoader);
    }

    var addComments = function () {
      renderComments();
      if (socialComments.childNodes.length === foto.comments.length) {
        window.utils.hide(commentsLoader);
      }
    };
    commentsLoader.addEventListener('click', addComments);
    if (commentsLoader.classList.contains('hidden')) {
      commentsLoader.removeEventListener('click', addComments);
    }
  };

  window.picture = {
    pictureClickHandler: pictureClickHandler
  };
})();
