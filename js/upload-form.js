'use strict';

(function () {
  var KEYCODE = window.util.Keycode;

  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFileInput = document.querySelector('#upload-file');
  var editPhotoForm = document.querySelector('.img-upload__overlay');
  var uploadCancelButton = document.querySelector('#upload-cancel');

  uploadFileInput.addEventListener('change', function () {
    editPhotoForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });

  // работаем с открытием-закрытием окна редактирования фото
  var openEditPhotoForm = function () {
    editPhotoForm.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.scale.setNewScaleValue(100);
    uploadCancelButton.addEventListener('click', closeEditPhotoForm);
  };

  var closeEditPhotoForm = function () {
    // если фокус находится в поле ввода хэштега или комментария, нажатие на Esc не приводит к закрытию формы редактирования изображения
    if (!document.activeElement.classList.contains('text__hashtags') && !document.activeElement.classList.contains('text__description')) {
      // сбрасываем значение поля выбора файла #upload-file
      uploadFileInput.value = '';

      editPhotoForm.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
      window.effect.resetUploadForm();
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KEYCODE.ESC_KEY) {
      closeEditPhotoForm();
    }
  };

  var cleanupForm = function () {
    window.gallery.changeCursorToLoading();
    window.effect.resetUploadForm();
    editPhotoForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadCancelButton.removeEventListener('click', closeEditPhotoForm);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadForm.addEventListener('submit', function (evt) {
    var formDataValue = new FormData(uploadForm);
    cleanupForm();
    window.async.uploadData(formDataValue, window.gallery.renderSuccessMessage, window.gallery.renderErrorMessage);
    // для вывода отправляемых данных в консоль:
    // for (var pair of formDataValue.entries()) {
    //   console.log(pair[0]+ ', ' + pair[1]);
    // };
    evt.preventDefault();
  });

  uploadFileInput.addEventListener('change', openEditPhotoForm);

})();
