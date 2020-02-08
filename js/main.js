'use strict';
(function () {
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
    paragraph.textContent = comment.message;
    li.appendChild(img);
    li.appendChild(paragraph);
    return li;
  };

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

    var pictureComments = foto.comments;
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

  window.main = {
    pictureClickHandler: pictureClickHandler
  };
})();
