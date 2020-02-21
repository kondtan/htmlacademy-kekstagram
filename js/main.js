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

var generateComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomInteger(1, MAX_AMOUNT_OF_AVATARS) + '.svg',
    message: getRandomArrayElement(COMMENTS),
    name: getRandomArrayElement(NAMES)
  };

  return comment;
};

var generateCommentsArray = function () {
  var commentsAmount = getRandomInteger(1, MAX_AMOUNT_OF_COMMENTS);
  var comments = [];

  for (var i = 0; i <= commentsAmount; i++) {
    comments.push(generateComment());
  }

  return comments;
};

var generatePictureContent = function (pictureIndex) {
  var pictureContent = {
    url: 'photos/' + pictureIndex + '.jpg',
    description: 'description',
    likes: getRandomInteger(MIN_AMOUNT_OF_LIKES, MAX_AMOUNT_OF_LIKES),
    comments: generateCommentsArray(),
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

var generatePicturesArray = function () {
  var elements = [];
  for (var i = 0; i < MAX_AMOUNT_OF_PICTURES; i++) {
    var newElement = generatePictureContent(i + 1);
    elements.push(newElement);
  }

  return elements;
};

var insertPictures = function () {
  var fragment = document.createDocumentFragment();

  for (var i = 1; i < MAX_AMOUNT_OF_PICTURES; i++) {
    fragment.appendChild(renderPicture(generatePictureContent(i)));
  }

  return fragment;
};

picturesList = generatePicturesArray(MAX_AMOUNT_OF_PICTURES);
usersPictures.appendChild(insertPictures(picturesList));

// задание 7, показываем первую фотографию из массива
var showBigPicture = function () {
  bigPicture.classList.remove('hidden');
};

var assembleComment = function (comment) {
  var commentClone = commentTemplate.content.cloneNode(true);

  commentClone.querySelector('.social__picture').src = comment.avatar;
  commentClone.querySelector('.social__picture').alt = comment.name;
  commentClone.querySelector('.social__text').textContent = comment.message;

  return commentClone;
};

var renderComments = function (commentsArray) {
  for (var i = 0; i < commentsArray.length; i++) {
    var newComment = assembleComment(commentsArray[i]);
    commentsList.appendChild(newComment);
  }
};

var hideCounters = function () {
  var commentsCounter = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.comments-loader');

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

var fillBigPictureInfo = function () {
  document.querySelector('body').classList.add('modal-open');
  hideCounters();

  bigPicture.querySelector('.big-picture__img').src = picturesList[0].url;
  bigPicture.querySelector('.likes-count').textContent = picturesList[0].likes;
  bigPicture.querySelector('.comments-count').textContent = picturesList[0].comments.length;
  bigPicture.querySelector('.social__caption').textContent = picturesList[0].description;

  renderComments(picturesList[0].comments);
  showBigPicture();
};

fillBigPictureInfo();
