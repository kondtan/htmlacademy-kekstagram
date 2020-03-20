'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var StatusCode = {
    OK: 200,
    REQUEST_ERROR: 400,
    ACCESS_ERROR: 403,
    NOT_FOUND_ERROR: 404,
    SERVER_ERROR: 500,
    RESPONSE_ERROR: 502,
    SERVICE_UNAVIALABLE: 503
  };
  var TIMEOUT_IN_MS = 10000;

  var processResponse = function (xhr, onSuccess, onError) {

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        switch (xhr.status) {
          case StatusCode.REQUEST_ERROR:
            onError('Ошибка 400: Неверный запрос');
            break;
          case StatusCode.ACCESS_ERROR:
            onError('Ошибка 403: Доступ запрещен');
            break;
          case StatusCode.NOT_FOUND_ERROR:
            onError('Ошибка 404: Ничего не найдено');
            break;
          case StatusCode.SERVER_ERROR:
            onError('Ошибка 500: Ошибка сервера');
            break;
          case StatusCode.RESPONSE_ERROR:
            onError('Ошибка 502: Неверный ответ сервера');
            break;
          case StatusCode.SERVICE_UNAVIALABLE:
            onError('Ошибка 503: Сервер временно недоступен');
            break;
          default:
            onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

  };

  var requestData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    processResponse(xhr, onSuccess, onError);
    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  var uploadData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', UPLOAD_URL);
    xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    processResponse(xhr, onSuccess, onError);
    xhr.send(data);
  };

  window.async = {
    requestData: requestData,
    uploadData: uploadData
  };
})();
