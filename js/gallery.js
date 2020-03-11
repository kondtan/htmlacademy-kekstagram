'use strict';

(function () {
  var MAX_AMOUNT_OF_PICTURES = 25;
  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
  var usersPictures = document.querySelector('.pictures');
  var picturesList = [];

  var renderPicture = function (pictureContent, pictureIndex) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = pictureContent.url;
    pictureElement.querySelector('.picture__comments').textContent = pictureContent.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = pictureContent.likes;
    pictureElement.dataset.id = pictureIndex;

    return pictureElement;
  };

  var renderPictures = function () {
    var fragment = document.createDocumentFragment();

    for (var i = 1; i < MAX_AMOUNT_OF_PICTURES; i++) {
      fragment.appendChild(renderPicture(window.data.createMockPicture(i), i - 1));
    }

    return fragment;
  };

  picturesList = window.data.createMockPictureArray(MAX_AMOUNT_OF_PICTURES);
  usersPictures.appendChild(renderPictures(picturesList));

  usersPictures.addEventListener('click', function (evt) {
    if (evt.target.closest('a')) {
      evt.preventDefault();
      var pictureIndex = parseInt(evt.target.closest('a').dataset.id, 10);
      window.picture.showBigPicture(picturesList[pictureIndex]);
    }
  });
})();
