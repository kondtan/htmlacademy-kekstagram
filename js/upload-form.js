'use strict';

(function () {
  var KEYCODE = window.util.Keycode;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancelButton = document.querySelector('#upload-cancel');

  uploadFileInput.addEventListener('change', function () {
    uploadOverlay.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });

  // работаем с открытием-закрытием окна редактирования фото
  var openUploadForm = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.scale.setNewScaleValue(100);
    uploadCancelButton.addEventListener('click', closeUploadForm);
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KEYCODE.ESC_KEY && !document.activeElement.classList.contains('text__hashtags') && !document.activeElement.classList.contains('text__description')) {
      closeUploadForm();
    }
  };

  var closeUploadForm = function () {
    window.effect.resetUploadForm();
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadCancelButton.removeEventListener('click', closeUploadForm);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadForm.addEventListener('submit', function (evt) {
    var formDataValue = new FormData(uploadForm);
    closeUploadForm();
    window.async.uploadData(formDataValue, window.gallery.renderSuccessMessage, window.gallery.renderErrorMessage);
    // для вывода отправляемых данных в консоль:
    // for (var pair of formDataValue.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]);
    // };
    evt.preventDefault();
  });

  uploadFileInput.addEventListener('change', openUploadForm);

})();
