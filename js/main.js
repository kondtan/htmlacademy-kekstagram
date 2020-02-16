'use strict';

// В выборе имени лучше короче или более развернуто? MAX_AMOUNT_OF_PICTURES - все понятно, длинно. MAX_OF_PICTURES короче, но менее понятно
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

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getRandomInteger = function (min, max) {
  var random = Math.random() * (max + 1) + min;
  return Math.floor(random);
};

var generateComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomInteger(1, MAX_AMOUNT_OF_AVATARS) + '.jpg',
    message: getRandomArrayElement(COMMENTS),
    name: getRandomInteger(NAMES)
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
