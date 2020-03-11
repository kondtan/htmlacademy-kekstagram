'use strict';

(function () {
  // var DEFAULT_EFFECT_LEVEL = 100;

  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
  var effectLevelSlider = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  // var effectLevelValue = document.querySelector('.effect-level__value');

  // насыщенность по умолчанию
  // var setDefaultDepth = function () {
  //   effectLevelPin.style.left = DEFAULT_EFFECT_LEVEL + '%';
  //   effectLevelDepth.style.width = DEFAULT_EFFECT_LEVEL + '%';
  //   effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
  // };

  // обнуляем эффект: сбрасываем класс у превью; если слайдер спрятан, то показываем; ставим пин и уровень насыщенности эффекта в начало
  var clearEffects = function () {
    uploadPreview.setAttribute('class', '');
    if (effectLevelSlider.classList.contains('visually-hidden')) {
      effectLevelSlider.classList.remove('visually-hidden');
    }
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
  };

  uploadOverlay.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.parentNode.classList.contains('effects__item')) {
      clearEffects();
      // присваеваем эффект актуального фильтра
      uploadPreview.classList.add('effects__preview--' + uploadOverlay.querySelector('input[type="radio"]:checked').value);
    }
    if (uploadOverlay.querySelector('input[type="radio"]:checked').value === 'none') {
      effectLevelSlider.classList.add('visually-hidden');
    }
  });

  // вешаем на пин слушатель клика
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var minSliderPosition = effectLevelLine.getBoundingClientRect().left;
    var maxSliderPosition = effectLevelLine.getBoundingClientRect().right;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (startCoords.x > minSliderPosition && startCoords.x < maxSliderPosition) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }
      if (effectLevelPin.style.left < minSliderPosition) {
        effectLevelPin.style.left = minSliderPosition;
      } else if (effectLevelPin.style.left > maxSliderPosition) {
        effectLevelPin.style.left = maxSliderPosition;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  // определяем интенсивность наложенного фильтра
  effectLevelPin.addEventListener('mouseup', function () {
    var filterEffectIntensity = effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth;
    return filterEffectIntensity;
  });
})();
