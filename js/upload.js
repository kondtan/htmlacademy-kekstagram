'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';

  window.upload = function (data, onSuccess) {
    var xhr = new this.XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('respond', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();

// upload-form.js
// put into form file img-upload__overlay = form
// editPhotoForm.addEventListener('submit', function (evt) {
//     window.upload(new FormData(form), function (response) {
//       userDialog.classList.add('hidden');
//     });
//     evt.preventDefault();
//   });
