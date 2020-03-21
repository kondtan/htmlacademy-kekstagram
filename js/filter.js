'use strict';

(function () {
  var MAX_RANDOM_ELEMENTS = 10;
  var DEFAULT_FILTER = 'filter-default';
  var RANDOM_FILTER = 'filter-random';
  var DISCUSSED_FILTER = 'filter-discussed';

  var imgFilters = document.querySelector('.img-filters');
  var imgFiltersForm = imgFilters.querySelector('.img-filters__form');

  var showImgFilters = function () {
    imgFilters.classList.remove('img-filters--inactive');
  };

  var sortPhotosByCommentsNumber = function () {
    var pictureArrayCopy = window.gallery.pictureArray().slice();
    pictureArrayCopy.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });
    window.gallery.loadPictures(pictureArrayCopy);
  };

  var showTenRandomPhotos = function () {
    var pictureArrayCopy = window.gallery.pictureArray().slice();

    var randomPictureArray = pictureArrayCopy.sort(function () {
      return 0.5 - Math.random();
    });

    window.gallery.loadPictures(randomPictureArray, MAX_RANDOM_ELEMENTS);
  };

  var sortPhotosByName = function () {
    var pictureArrayCopy = window.gallery.pictureArray().slice();

    pictureArrayCopy.sort(function (second, first) {
      return parseInt(second.url.replace(/\D/g, ''), 10) - parseInt(first.url.replace(/\D/g, ''), 10);
    });

    window.gallery.loadPictures(pictureArrayCopy);
  };

  var sortPhotos = function (filter) {
    switch (filter) {
      case DEFAULT_FILTER:
        sortPhotosByName();
        break;
      case RANDOM_FILTER:
        showTenRandomPhotos();
        break;
      case DISCUSSED_FILTER:
        sortPhotosByCommentsNumber();
        break;
      default:
        sortPhotosByName();
    }
  };

  var toggleFilter = function (evt) {
    var activeFilter = imgFilters.querySelector('.img-filters__button--active');

    if (evt.target.nodeName === 'BUTTON') {
      evt.preventDefault();
      activeFilter.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
    }

    window.gallery.clearGallery();
    sortPhotos(evt.target.id);
  };

  imgFiltersForm.addEventListener('click', toggleFilter);

  window.filtration = {
    showImgFilters: showImgFilters
  };
})();
