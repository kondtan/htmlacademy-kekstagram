'use strict';

(function () {
  var MAX_AMOUNT_OF_PICTURES = 25;
  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
  var usersPictures = document.querySelector('.pictures');
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

  var loadPictures = function (pictures) {
    window.gallery.pictureArray = pictures;
    usersPictures.appendChild(renderPictures(window.gallery.pictureArray));
  };

  window.load.requestData(window.data.parseRemoteData);

  usersPictures.addEventListener('click', function (evt) {
    if (evt.target.closest('a')) {
      evt.preventDefault();
      var pictureIndex = parseInt(evt.target.closest('a').dataset.id, 10);
      window.picture.showBigPicture(window.gallery.pictureArray[pictureIndex]);
    }
  });

  window.gallery = {
    renderPictures: renderPictures,
    usersPictures: usersPictures,
    loadPictures: loadPictures,
    pictureArray: pictureArray
  };
})();
