


require("../models/User");
require("../models/Item");
require("../models/Comment");
const mongoose = require("mongoose");

let UserModel = require('mongoose').model('User');
let ItemModel = require('mongoose').model('Item');
const SEED_COUNT = 100;

//Add users
mongoose.connect(process.env.MONGODB_URI, {poolSize: 100});
for (let i=0; i < SEED_COUNT; i++)
{
  let user = new UserModel();
  user.username = 'oldmacdonaldssss'+i;
  user.email = 'oldmacdonaldssss'+i+'@gmail.com';
  user.setPassword('old'+i);
  user
    .save()
    .then(function (user) {
      console.log('Added user:' + user.email);
    }).then(function () {
      if (i==SEED_COUNT-1){
        mongoose.disconnect();
      }

  });
}

//Add items
mongoose.connect(process.env.MONGODB_URI, {poolSize: 100});
for (let i=0; i < SEED_COUNT; i++) {
  let name = 'oldmacdonaldssss' + i;
  UserModel.findOne({username: name}).exec()
    .then(function (user) {
      return ItemModel.create(
        {title: 'Cow' + i, description: 'Black cow, with ' + i + ' white spots', seller: user});
    }).then(function () {
    if (i == SEED_COUNT - 1) {
      mongoose.disconnect();
    }
  });
}


console.log("done seeding");