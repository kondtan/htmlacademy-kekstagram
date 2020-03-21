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

  var returnPictureArray = function () {
    return pictureArray;
  };

  var renderPictures = function (pictures, amount) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < amount; i++) {
      fragment.appendChild(renderPicture(pictures[i], i));
    }

    return fragment;
  };

  var loadPictures = function (pictures, amount) {
    if (amount === undefined) {
      amount = MAX_AMOUNT_OF_PICTURES;
    }
    pictureArray = pictures.slice();
    usersPictures.appendChild(renderPictures(pictureArray, amount));
    window.filtration.showImgFilters();
  };

  var closeMessage = function (evt) {
    evt.preventDefault();
    evt.target.parentNode.parentNode.remove();
    evt.target.removeEventListener('click', closeMessage);
  };

  var renderErrorMessage = function (message) {
    var error = errorTemplate.cloneNode(true);
    var errorButton = error.querySelector('.error__button');

    error.querySelector('button').textContent = 'Попробуйте еще раз';
    error.querySelector('h2').textContent = message;
    document.querySelector('main').appendChild(error);

    errorButton.addEventListener('click', closeMessage);
  };

  var renderSuccessMessage = function () {
    var success = successTemplate.cloneNode(true);
    var successButton = success.querySelector('.success__button');

    document.querySelector('main').appendChild(success);

    successButton.addEventListener('click', closeMessage);
  };

  var initializePage = function () {
    window.async.requestData(loadPictures, renderErrorMessage);
  };

  var clearGallery = function () {
    var pictures = usersPictures.querySelectorAll('.picture');
    pictures.forEach(function (element) {
      element.remove();
    });
  };

  initializePage();

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
    pictureArray: returnPictureArray,
    clearGallery: clearGallery
  };
})();
