'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var filePicker = document.querySelector('.img-upload input[type=file]');
  var preview = document.querySelector('.img-upload__preview img');

  filePicker.addEventListener('change', function () {
    var file = filePicker.files[0];
    var fileName = file.name.toLowerCase();

    preview.src = '';

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
