'use strict';

(function () {
  var SCALE_STEP = 25;
  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;

  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
  var scaleContainer = document.querySelector('.scale');
  var buttonScaleSmaller = scaleContainer.querySelector('.scale__control--smaller');
  var buttonScaleBigger = scaleContainer.querySelector('.scale__control--bigger');
  var scaleControlValue = scaleContainer.querySelector('.scale__control--value');

  // обрабатываем значение зума, чтобы картинка ресайзилась
  var setNewScaleValue = function (newScaleValue) {
    var newValue = newScaleValue / MAX_SCALE_VALUE;
    uploadPreview.style.transform = 'scale(' + newValue + ')';
    return newValue;
  };

  // меняем значение ресайза
  var decreaseScaleValue = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);

    if (scaleValue > MIN_SCALE_VALUE) {
      scaleValue = scaleValue - SCALE_STEP;
    }

    return scaleValue;
  };

  var increaseScaleValue = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);

    if (scaleValue < MAX_SCALE_VALUE) {
      scaleValue = scaleValue + SCALE_STEP;
    }

    return scaleValue;
  };

  // передаем актуальное значение ресайза кнопкам + -
  var onButtonScaleSmallerClick = function () {
    var newValue = decreaseScaleValue();

    setNewScaleValue(newValue);
    scaleControlValue.value = newValue + '%';
  };

  var onButtonScaleBiggerClick = function () {
    var newValue = increaseScaleValue();

    setNewScaleValue(newValue);
    scaleControlValue.value = newValue + '%';
  };

  // вешаем слушатель на кнопки + -
  buttonScaleSmaller.addEventListener('click', onButtonScaleSmallerClick);
  buttonScaleBigger.addEventListener('click', onButtonScaleBiggerClick);

  // создаем интерфейс, чтобы сбросить значение ресайза при повторном отрытии окна загрузки
  window.scale = {
    setNewScaleValue: setNewScaleValue
  };
})();
