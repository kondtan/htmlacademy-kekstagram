'use strict';

(function () {
  var KEYCODE = window.util.Keycode;
  var uploadFileInput = document.querySelector('#upload-file');
  var editPhotoForm = document.querySelector('.img-upload__overlay');
  var closeEditPhotoFormButton = document.querySelector('#upload-cancel');

  uploadFileInput.addEventListener('change', function () {
    editPhotoForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');
  });

  // работаем с открытием-закрытием окна редактирования фото
  var openEditPhotoForm = function () {
    editPhotoForm.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.scale.setNewScaleValue(100);
  };

  var closeEditPhotoForm = function () {
    // если фокус находится в поле ввода хэштега или комментария, нажатие на Esc не приводит к закрытию формы редактирования изображения
    if (!document.activeElement.classList.contains('text__hashtags') && !document.activeElement.classList.contains('text__description')) {
      // сбрасываем значение поля выбора файла #upload-file
      uploadFileInput.value = '';

      editPhotoForm.classList.add('hidden');
      document.removeEventListener('keydown', onPopupEscPress);
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KEYCODE.ESC_KEY) {
      closeEditPhotoForm();
    }
  };

  // editPhotoForm.addEventListener('submit', function (evt) {
  //   window.upload(new FormData(form), function (response) {
  //     userDialog.classList.add('hidden');
  //   });
  //   evt.preventDefault();
  // });

  closeEditPhotoFormButton.addEventListener('click', closeEditPhotoForm);
  uploadFileInput.addEventListener('change', openEditPhotoForm);
})();
