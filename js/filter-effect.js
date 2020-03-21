'use strict';

(function () {
  var DEFAULT_EFFECT_LEVEL = 1;
  var DEFAULT_FILTER_NAME = 'none';
  var MAX_PHOBOS_INTENCITY = 3;
  var MIN_HEAT_INTENCITY = 1;
  var MAX_HEAT_INTENCITY = 3;
  var MAX_MARVIN_INTENCITY = 100;

  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('.img-upload__form');
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
  var effectLevelSlider = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var currentFilter = DEFAULT_FILTER_NAME;

  // обнуляем эффект: сбрасываем класс у превью; если слайдер спрятан, то показываем; ставим пин и уровень насыщенности эффекта в начало
  var resetFilter = function (filter) {
    currentFilter = filter;

    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';

    uploadPreview.setAttribute('class', 'effects__preview--' + filter);

    applyFilter(filter, DEFAULT_EFFECT_LEVEL);

    if (filter.includes('none')) {
      effectLevelSlider.classList.add('visually-hidden');
    } else {
      effectLevelSlider.classList.remove('visually-hidden');
    }
  };

  uploadOverlay.addEventListener('click', function (evt) {
    var target = evt.target;

    if (target.parentNode.classList.contains('effects__item')) {
      resetFilter(uploadOverlay.querySelector('input[type="radio"]:checked').value);
    }

  });

  // вешаем на пин слушатель клика
  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var minSliderPosition = effectLevelLine.offsetLeft - effectLevelPin.offsetWidth;
    var sliderWidth = minSliderPosition + effectLevelLine.offsetWidth;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var cursorPosition = moveEvt.movementX + effectLevelPin.offsetLeft;
      var newPosition;
      var intensity;

      if (cursorPosition < minSliderPosition) {
        newPosition = 0;
      } else if (cursorPosition > sliderWidth) {
        newPosition = sliderWidth;
      } else {
        newPosition = cursorPosition;
      }

      effectLevelPin.style.left = newPosition + 'px';
      effectLevelDepth.style.width = newPosition + 'px';

      intensity = Math.floor(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 100) / 100;
      effectLevelValue.value = intensity * 100;

      applyFilter(currentFilter, intensity);
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
  var applyFilter = function (filter, intensity) {
    switch (filter) {
      case 'chrome':
        uploadPreview.style.filter = 'grayscale(' + intensity + ')';
        break;
      case 'sepia':
        uploadPreview.style.filter = 'sepia(' + intensity + ')';
        break;
      case 'marvin':
        uploadPreview.style.filter = 'invert(' + (intensity * MAX_MARVIN_INTENCITY) + '%)';
        break;
      case 'phobos':
        uploadPreview.style.filter = 'blur(' + (intensity * MAX_PHOBOS_INTENCITY) + 'px)';
        break;
      case 'heat':
        uploadPreview.style.filter = 'brightness(' + (intensity * (MAX_HEAT_INTENCITY - MIN_HEAT_INTENCITY) + MIN_HEAT_INTENCITY) + ')';
        break;
      default:
        uploadPreview.style.filter = '';
    }
  };

  var resetUploadForm = function () {
    uploadForm.reset();
    uploadFileInput.value = '';
    resetFilter(DEFAULT_FILTER_NAME);
  };

  window.effect = {
    resetUploadForm: resetUploadForm
  };

})();
