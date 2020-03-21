'use strict';

(function () {
  var COMMENTS_DISPLAY_STEP = 5;

  var bigPicture = document.querySelector('.big-picture');
  var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');

  var commentsList = document.querySelector('.social__comments');
  var commentTemplate = document.querySelector('#comment');
  var commentLoader = bigPicture.querySelector('.comments-loader');
  var commentCounter = bigPicture.querySelector('.social__comment-count');

  var totalComments = 0;
  var totalCommentsShown = 0;
  var commentsLeftToRender = [];

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

  var setCommentCounter = function (comments) {
    var difference = comments.length - commentsLeftToRender.length;

    totalCommentsShown += difference;
    commentCounter.querySelector('.comments-rendered').textContent = totalCommentsShown;
  };

  var hideCommentLoader = function () {
    commentLoader.classList.add('hidden');
    commentLoader.removeEventListener('click', loadMoreComments);
  };

  var showComments = function (comments) {
    var commentsToRender = [];

    if (comments.length <= COMMENTS_DISPLAY_STEP) {
      commentsToRender = comments.slice();
      hideCommentLoader();
    } else {
      commentsToRender = comments.slice(0, COMMENTS_DISPLAY_STEP);
    }

    commentsList.appendChild(renderCommentArray(commentsToRender));
    commentsLeftToRender = comments.slice(COMMENTS_DISPLAY_STEP);
    setCommentCounter(comments);
  };

  var loadMoreComments = function (evt) {
    evt.preventDefault();
    showComments(commentsLeftToRender);
  };

  var renderBigPicture = function (pic) {
    bigPicture.querySelector('.big-picture__img img').src = pic.url;
    bigPicture.querySelector('.likes-count').textContent = pic.likes;
    bigPicture.querySelector('.social__caption').textContent = pic.description;
  };

  var onBigPictureEscPress = function (evt) {
    if (evt.keyCode === window.util.Keycode.ESC_KEY) {
      closeBigPicture();
    }
  };

  var showBigPicture = function (pic) {
    bigPicture.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    renderBigPicture(pic);
    commentsList.textContent = '';

    totalComments = pic.comments.length;
    commentCounter.querySelector('.comments-total').textContent = totalComments;
    showComments(pic.comments);


    closeBigPictureButton.addEventListener('click', closeBigPicture);
    commentLoader.addEventListener('click', loadMoreComments);
    document.addEventListener('keydown', onBigPictureEscPress);
  };

  var closeBigPicture = function () {
    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
    bigPicture.querySelector('.big-picture__cancel').removeEventListener('click', closeBigPicture);
    document.removeEventListener('keydown', onBigPictureEscPress);

    if (commentLoader.className.includes('hidden')) {
      commentLoader.classList.remove('hidden');
    }

    totalCommentsShown = 0;
  };

  window.picture = {
    showBigPicture: showBigPicture
  };
})();
