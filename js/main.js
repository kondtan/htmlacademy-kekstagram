'use strict';

var MAX_AMOUNT_OF_PICTURES = 25;
var MAX_AMOUNT_OF_AVATARS = 6;
var MAX_AMOUNT_OF_COMMENTS = 11;
var MAX_AMOUNT_OF_LIKES = 200;
var MIN_AMOUNT_OF_LIKES = 15;
var NAMES = ['Вася', 'Петя', 'Маша', 'Екатерина', 'Всеволод', 'Иннокентий', 'Елена'];
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
var usersPictures = document.querySelector('.pictures');
var picturesList = [];
var bigPicture = document.querySelector('.big-picture');
var commentsList = document.querySelector('.social__comments');
var commentTemplate = document.querySelector('#comment');

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomInteger = function (min, max) {
  var random = Math.random() * (max - 1) + min;
  return Math.floor(random);
};

var createMockComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomInteger(1, MAX_AMOUNT_OF_AVATARS) + '.svg',
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  };

  return comment;
};

var createMockCommentArray = function () {
  var commentsAmount = getRandomInteger(1, MAX_AMOUNT_OF_COMMENTS);
  var comments = [];

  for (var i = 0; i <= commentsAmount; i++) {
    comments.push(createMockComment());
  }

  return comments;
};

var createMockPicture = function (pictureIndex) {
  var pictureContent = {
    url: 'photos/' + pictureIndex + '.jpg',
    description: 'description',
    likes: getRandomInteger(MIN_AMOUNT_OF_LIKES, MAX_AMOUNT_OF_LIKES),
    comments: createMockCommentArray(),
  };

  return pictureContent;
};

var renderPicture = function (pictureContent) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = pictureContent.url;
  pictureElement.querySelector('.picture__comments').textContent = pictureContent.comments.length;
  pictureElement.querySelector('.picture__likes').textContent = pictureContent.likes;

  return pictureElement;
};

var createMockPictureArray = function () {
  var elements = [];
  for (var i = 0; i < MAX_AMOUNT_OF_PICTURES; i++) {
    var newElement = createMockPicture(i + 1);
    elements.push(newElement);
  }

  return elements;
};

var renderPictures = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 1; i < MAX_AMOUNT_OF_PICTURES; i++) {
    fragment.appendChild(renderPicture(createMockPicture(i)));
  }

  return fragment;
};

picturesList = createMockPictureArray(MAX_AMOUNT_OF_PICTURES);
usersPictures.appendChild(renderPictures(picturesList));

// задание 7, показываем первую фотографию из массива

var renderComment = function (comment) {
  var commentClone = commentTemplate.content.cloneNode(true);

  commentClone.querySelector('.social__picture').src = comment.avatar;
  commentClone.querySelector('.social__picture').alt = comment.name;
  commentClone.querySelector('.social__text').textContent = comment.message;

  return commentClone;
};

var renderCommentArray = function (commentArray) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < commentArray.length; i++) {
    fragment.appendChild(renderComment(commentArray[i]));
  }

  return fragment;
};

var hideCounters = function () {
  var commentsCounter = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

// превратила картинку в аргумент, ещё была ошибка: искала src у дива .big-picture__img, когда src у картинки img
var renderBigPicture = function (pic) {
  bigPicture.querySelector('.big-picture__img img').src = pic.url;
  bigPicture.querySelector('.likes-count').textContent = pic.likes;
  bigPicture.querySelector('.comments-count').textContent = pic.comments.length;
  bigPicture.querySelector('.social__caption').textContent = pic.description;
};

var showBigPicture = function (pic) {
  hideCounters();

  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  renderBigPicture(pic);
  commentsList.appendChild(renderCommentArray(pic.comments));
};

// невозможное условие, чтобы большая картинка не отбражалась и линтер не ругался
if (!picturesList) {
  showBigPicture(picturesList[0]);
}

// задание 4.2, загрузка изображения и показ формы для редактирования
var ESC_KEY = 27;
var MAX_HASHTAGS_AMOUNT = 5;
var MAX_HASHTAG_CHARACTERS = 20;
var HASHTAG_PATTERN = /[^0-9a-zа-яёA-ZА-ЯЁ]+/g;
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
var effectLevelSlider = uploadOverlay.querySelector('.img-upload__effect-level');
var uploadFileInput = document.querySelector('#upload-file');
var editPhotoForm = document.querySelector('.img-upload__overlay');
var closeEditPhotoFormButton = document.querySelector('#upload-cancel');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelLine = document.querySelector('.effect-level__line');
var hashtagsInput = document.querySelector('.text__hashtags');

uploadFileInput.addEventListener('change', function () {
  editPhotoForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
});

// работаем с открытием-закрытием окна редактирования фото
var openEditPhotoForm = function () {
  editPhotoForm.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closeEditPhotoForm = function () {
  if (!document.activeElement.classList.contains('text__hashtags')) {
    // сбрасываем значение поля выбора файла #upload-file
    uploadFileInput.value = '';

    editPhotoForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  }
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    closeEditPhotoForm();
  }
};

closeEditPhotoFormButton.addEventListener('click', closeEditPhotoForm);
uploadFileInput.addEventListener('change', openEditPhotoForm);

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

// валидируем хэштеги
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
