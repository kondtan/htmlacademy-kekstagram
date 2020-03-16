'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT = 10000;

  var requestData = function (onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        // onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      // onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      // onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  window.load = {
    requestData: requestData
  };
})();
