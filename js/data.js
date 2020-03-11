'use strict';

(function () {
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

  var createMockComment = function () {
    var comment = {
      avatar: 'img/avatar-' + window.util.getRandomInteger(1, MAX_AMOUNT_OF_AVATARS) + '.svg',
      message: window.util.getRandomArrayElement(COMMENTS),
      name: window.util.getRandomArrayElement(NAMES)
    };

    return comment;
  };

  var createMockCommentArray = function () {
    var commentsAmount = window.util.getRandomInteger(1, MAX_AMOUNT_OF_COMMENTS);
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
      likes: window.util.getRandomInteger(MIN_AMOUNT_OF_LIKES, MAX_AMOUNT_OF_LIKES),
      comments: createMockCommentArray(),
    };

    return pictureContent;
  };

  var createMockPictureArray = function () {
    var elements = [];
    for (var i = 0; i < MAX_AMOUNT_OF_PICTURES; i++) {
      var newElement = createMockPicture(i + 1);
      elements.push(newElement);
    }

    return elements;
  };

  window.data = {
    createMockPictureArray: createMockPictureArray
  };
})();
