'use strict';

(function () {
  var KEYCODE = {
    ESC_KEY: 27,
    ENTER_KEY: 13
  };

  var getRandomArrayElement = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };

  var getRandomInteger = function (min, max) {
    var random = Math.random() * (max - 1) + min;
    return Math.floor(random);
  };

  window.util = {
    KEYCODE: KEYCODE,
    getRandomArrayElement: getRandomArrayElement,
    getRandomInteger: getRandomInteger
  };
})();
