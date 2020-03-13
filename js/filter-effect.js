'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = 1;
  var MAX_PHOBOS_INTENCITY = 3;
  var MAX_HEAT_INTENCITY = 3;
  var MAX_MARVIN_INTENCITY = 100;

  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
  var effectLevelSlider = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelValue = document.querySelector('.effect-level__value');

  // насыщенность по умолчанию
  var setDefaultDepth = function () {
    effectLevelPin.style.left = (DEFAULT_EFFECT_LEVEL * 100) + '%';
    effectLevelDepth.style.width = (DEFAULT_EFFECT_LEVEL * 100) + '%';
    effectLevelValue.value = DEFAULT_EFFECT_LEVEL;
  };

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
    var sliderWidth = effectLevelLine.getBoundingClientRect().width;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var cursorPosition = moveEvt.clientX - minSliderPosition;
      var newPosition;

      if (cursorPosition < 0) {
        newPosition = 0;
      } else if (cursorPosition > sliderWidth) {
        newPosition = sliderWidth;
      } else {
        newPosition = cursorPosition;
      }

      effectLevelPin.style.left = newPosition.toString() + 'px';
      effectLevelDepth.style.width = newPosition.toString() + 'px';

      changeFilter();

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
  var changeFilter = function () {

    var intensity = Math.round(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 100) / 100;
    effectLevelValue.value = intensity;

    switch (uploadPreview.classList[0]) {
      case 'effects__preview--none':
        uploadPreview.style.filter = 'none';
        break;
      case 'effects__preview--chrome':
        uploadPreview.style.filter = 'grayscale(' + intensity.toString() + ')';
        break;
      case 'effects__preview--sepia':
        uploadPreview.style.filter = 'sepia(' + intensity.toString() + ')';
        break;
      case 'effects__preview--marvin':
        uploadPreview.style.filter = 'invert(' + (intensity * MAX_MARVIN_INTENCITY).toString() + '%)';
        break;
      case 'effects__preview--phobos':
        uploadPreview.style.filter = 'blur(' + (intensity * MAX_PHOBOS_INTENCITY).toString() + 'px)';
        break;
      case 'effects__preview--heat':
        uploadPreview.style.filter = 'brightness(' + (intensity * MAX_HEAT_INTENCITY).toString() + ')';
        break;
    }
  };

  window.onload = function () {
    setDefaultDepth();
  };

  function callback() {
    changeFilter();
  }

  var config = {
    attributes: true,
    attributeOldValue: true,
    attributeFilter: ['class']
  };

  var observer = new MutationObserver(callback);
  observer.observe(uploadPreview, config);
})();
