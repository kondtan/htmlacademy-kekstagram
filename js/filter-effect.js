'use strict';

(function () {
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
  var effectLevelSlider = uploadOverlay.querySelector('.img-upload__effect-level');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');

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

  // определяем интенсивность наложенного фильтра
  effectLevelPin.addEventListener('mouseup', function () {
    var filterEffectIntensity = effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth;
    return filterEffectIntensity;
  });
})();
