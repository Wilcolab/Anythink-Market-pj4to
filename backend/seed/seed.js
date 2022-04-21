
require("../models/User");
require("../models/Item");
require("../models/Comment");
const mongoose = require("mongoose");

let UserModel = require('mongoose').model('User');
let ItemModel = require('mongoose').model('Item');
let CommentModel = require('mongoose').model('Comment');

const SEED_COUNT = 100;
const USER_SEED_NAME = "oldmcdonalds";
const ITEM_SEED_NAME = "Cow";
const USER_SEED_PASS = "old";
const COMMENT_SEED_BODY = "Life is like a box of chocolate";

//Add users
mongoose.connect(process.env.MONGODB_URI, {poolSize: 100});
for (let counter=0; counter < SEED_COUNT; counter++)
{
  (function(i) {
  let user = new UserModel();
  user.username = USER_SEED_NAME+i;
  user.email = USER_SEED_NAME+i+'@gmail.com';
  user.setPassword(USER_SEED_PASS+i);
  user
    .save()
    .then(function (user) {
    }).then(function () {
    if (i == SEED_COUNT - 1) {
      mongoose.disconnect();
    }
  });
  })(counter);
}

//Add items
mongoose.connect(process.env.MONGODB_URI, {poolSize: 100});
for (let counter=0; counter < SEED_COUNT; counter++) {
  (function(i) {
  let name = USER_SEED_NAME + i;
  UserModel.findOne({username: name}).exec()
    .then(function (user) {
      return ItemModel.create(
        {title: ITEM_SEED_NAME + i, description: 'Black cow, with ' + i + ' white spots', seller: user});
    }).then(function () {
    if (i == SEED_COUNT - 1) {
      mongoose.disconnect();
    }
  });
  })(counter);
}

//Add comments
mongoose.connect(process.env.MONGODB_URI, {poolSize: 100});
for (let counter=0; counter < SEED_COUNT; counter++) {
  (function(i) {
    let name = USER_SEED_NAME + i;
    Promise.all([
      UserModel.findOne({username: name}),
      ItemModel.findOne({title: ITEM_SEED_NAME + i})
    ]).then((result) => {
      return CommentModel.create({body: COMMENT_SEED_BODY, seller: result[0], item: result[1]});
    }).then(function () {
      if (i == SEED_COUNT - 1) {
        mongoose.disconnect();
      }
    });
  })(counter);
}

console.log("done seeding");