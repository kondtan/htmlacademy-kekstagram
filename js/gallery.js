'use strict';

(function () {
  var MAX_AMOUNT_OF_PICTURES = 25;
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var usersPictures = document.querySelector('.pictures');
  var errorTemplate = document.querySelector('#error').content;
  var successTemplate = document.querySelector('#success').content;
  var pictureArray = [];

  var renderPicture = function (pictureContent, pictureIndex) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictureContent.url;
    pictureElement.querySelector('.picture__comments').textContent = pictureContent.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = pictureContent.likes;
    pictureElement.dataset.id = pictureIndex;

    return pictureElement;
  };

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < MAX_AMOUNT_OF_PICTURES; i++) {
      fragment.appendChild(renderPicture(pictures[i], i));
    }

    return fragment;
  };

  var changeCursorToLoading = function () {
    document.querySelector('body').style.cursor = 'progress';
  };

  var changeCursorBack = function () {
    document.querySelector('body').style.cursor = 'default';
  };

  var loadPictures = function (pictures) {
    changeCursorBack();
    pictureArray = pictures.slice();
    usersPictures.appendChild(renderPictures(pictureArray));
  };

  var renderErrorMessage = function (message) {
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('.error__button');
    error.querySelector('button').innerHTML = 'Перезагрузите страницу';
    error.querySelector('h2').innerHTML = message;
    document.querySelector('main').appendChild(error);
    changeCursorBack();
    errorButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      location.reload();
    });
  };

  var renderSuccessMessage = function () {
    var success = successTemplate.cloneNode(true);
    var successButton = success.querySelector('.success__button');
    document.querySelector('main').appendChild(success);
    changeCursorBack();
    successButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      document.querySelector('.success').remove();
    });
  };

  window.async.requestData(loadPictures, renderErrorMessage);
  changeCursorToLoading();

  usersPictures.addEventListener('click', function (evt) {
    if (evt.target.closest('a')) {
      evt.preventDefault();
      var pictureIndex = parseInt(evt.target.closest('a').dataset.id, 10);
      window.picture.showBigPicture(pictureArray[pictureIndex]);
    }
  });

  window.gallery = {
    renderPictures: renderPictures,
    usersPictures: usersPictures,
    loadPictures: loadPictures,
    renderErrorMessage: renderErrorMessage,
    renderSuccessMessage: renderSuccessMessage,
    changeCursorToLoading: changeCursorToLoading
  };
})();
