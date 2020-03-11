'use strict';

(function () {
  var MAX_HASHTAGS_AMOUNT = 5;
  var MAX_HASHTAG_CHARACTERS = 20;
  var HASHTAG_PATTERN = /[^0-9a-zа-яёA-ZА-ЯЁ]+/g;
  var hashtagsInput = document.querySelector('.text__hashtags');

  var validation = function () {
    // превращаем string в array
    var hashtags = hashtagsInput.value.replace(/  +/g, ' ').trim().split(' ');
    // сбрасываем проверку перед каждым нажатием
    hashtagsInput.setCustomValidity('');
    if (hashtags.length === 1 && hashtags[0] === '') {
      hashtagsInput.setCustomValidity('');
    } else if (hashtags.length > MAX_HASHTAGS_AMOUNT) {
      hashtagsInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else {
      // итерируем с конца на случай, если придется удалять пустые элементы массива. Например, лишние пробелы
      for (var i = hashtags.length - 1; i >= 0; i--) {
        var hashtag = hashtags[i];
        var hashtagCopy = false;

        for (var j = 0; j < i; j++) {
          if (hashtags[j].toLowerCase() === hashtag.toLowerCase()) {
            hashtagCopy = true;
          }
        }

        if (hashtag.charAt(0) !== '#') {
          hashtagsInput.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
        }
        if (hashtag.length > MAX_HASHTAG_CHARACTERS) {
          hashtagsInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        }
        // сделала по замечанию "!hashtag.match(HASHTAG_PATTERN)", но это сообщение все равно всплывало при вводе корректного хэштега
        if (hashtag.slice(1).match(HASHTAG_PATTERN)) {
          hashtagsInput.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
        }
        if ((hashtag.length === 1) && (hashtag === '#')) {
          hashtagsInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        }
        if (hashtagCopy) {
          hashtagsInput.setCustomValidity('Хеш-тег не должен повторяться');
        }
      }
    }
  };

  hashtagsInput.addEventListener('input', validation);
})();
