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
    var body = document.querySelector('body');
    var bigPicture = document.querySelector('.big-picture');
    var url = picture.querySelector('.picture__img').src;
    var likesCount = picture.querySelector('.picture__likes').textContent;
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
    var actualRenderedComments = foto.comments.length >= 5 ? 5 : foto.comments.length;

    var renderComments = function () {
      var commentsToRender = pictureComments.splice(0, 5);
      var newFragment = document.createDocumentFragment();
      for (var f = 0; f < commentsToRender.length; f++) {
        newFragment.appendChild(createSocialComment(commentsToRender[f]));
      }
      socialComments.appendChild(newFragment);
      socialCommentCount.innerHTML = actualRenderedComments + ' из ' + foto.comments.length + ' комментариев';
    };

    socialComments.innerHTML = '';
    renderComments();

    var commentsLoader = bigPicture.querySelector('.comments-loader');
    commentsLoader.addEventListener('click', function () {
      actualRenderedComments += pictureComments.length >= 5 ? 5 : pictureComments.length;
      renderComments();
      if (actualRenderedComments === foto.comments.length) {
        window.utils.hide(commentsLoader);
      }
    });
  };

  window.main = {
    pictureClickHandler: pictureClickHandler
  };
})();
