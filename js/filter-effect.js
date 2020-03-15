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
      applyFilter(DEFAULT_EFFECT_LEVEL);
    }

    if (uploadOverlay.querySelector('input[type="radio"]:checked').value === 'none') {
      effectLevelSlider.classList.add('visually-hidden');
      uploadPreview.style.filter = '';
    }
  });

  // Геттер, который собирает все отступы по родителям, но из-за верстки получается неверное значение

  // var getMinSliderPosition = function (element) {
  //   var topNode = element;
  //   var totalOffset = 0;
  //   while (topNode.parentElement) {
  //     totalOffset += topNode.offsetLeft;
  //     topNode = topNode.parentElement;
  //   }
  //   return totalOffset;
  // };

  // вешаем на пин слушатель клика
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var minSliderPosition = effectLevelLine.getBoundingClientRect().left;
    var sliderWidth = effectLevelLine.getBoundingClientRect().width;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var cursorPosition = moveEvt.clientX - minSliderPosition;
      var newPosition;
      var intensity;

      if (cursorPosition < 0) {
        newPosition = 0;
      } else if (cursorPosition > sliderWidth) {
        newPosition = sliderWidth;
      } else {
        newPosition = cursorPosition;
      }

      effectLevelPin.style.left = newPosition + 'px';
      effectLevelDepth.style.width = newPosition + 'px';

      intensity = Math.floor(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 100) / 100;
      effectLevelValue.value = intensity;

      applyFilter(intensity);
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
  var applyFilter = function (intensity) {
    switch (uploadPreview.className) {
      case 'effects__preview--chrome':
        uploadPreview.style.filter = 'grayscale(' + intensity + ')';
        break;
      case 'effects__preview--sepia':
        uploadPreview.style.filter = 'sepia(' + intensity + ')';
        break;
      case 'effects__preview--marvin':
        uploadPreview.style.filter = 'invert(' + (intensity * MAX_MARVIN_INTENCITY) + '%)';
        break;
      case 'effects__preview--phobos':
        uploadPreview.style.filter = 'blur(' + (intensity * MAX_PHOBOS_INTENCITY) + 'px)';
        break;
      case 'effects__preview--heat':
        uploadPreview.style.filter = 'brightness(' + (intensity * MAX_HEAT_INTENCITY) + ')';
        break;
      default:
        uploadPreview.style.filter = '';
    }
  };
})();
