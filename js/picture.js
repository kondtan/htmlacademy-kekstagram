'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment');

  // задание 7, показываем первую фотографию из массива
  var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');

  var renderComment = function (comment) {
    var commentClone = commentTemplate.content.cloneNode(true);

    commentClone.querySelector('.social__picture').src = comment.avatar;
    commentClone.querySelector('.social__picture').alt = comment.name;
    commentClone.querySelector('.social__text').textContent = comment.message;

    return commentClone;
  };

  var renderCommentArray = function (commentArray) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentArray.length; i++) {
      fragment.appendChild(renderComment(commentArray[i]));
    }

    return fragment;
  };

  var hideCounters = function () {
    var commentsCounter = bigPicture.querySelector('.social__comment-count');
    var commentsLoader = bigPicture.querySelector('.comments-loader');

    commentsCounter.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  // превратила картинку в аргумент, ещё была ошибка: искала src у дива .big-picture__img, когда src у картинки img
  var renderBigPicture = function (pic) {
    bigPicture.querySelector('.big-picture__img img').src = pic.url;
    bigPicture.querySelector('.likes-count').textContent = pic.likes;
    bigPicture.querySelector('.comments-count').textContent = pic.comments.length;
    bigPicture.querySelector('.social__caption').textContent = pic.description;
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.Keycode.ESC_KEY) {
      closeBigPicture();
    }
  };

  var showBigPicture = function (pic) {

    hideCounters();

    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    renderBigPicture(pic);
    commentsList.textContent = '';
    commentsList.appendChild(renderCommentArray(pic.comments));

    closeBigPictureButton.addEventListener('click', closeBigPicture);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);
  };

  window.picture = {
    showBigPicture: showBigPicture
  };
})();
