


require("../models/User");
require("../models/Item");
require("../models/Comment");
const mongoose = require("mongoose");


let UserModel = require('mongoose').model('User');
let ItemModel = require('mongoose').model('Item');
const SEED_COUNT = 100;

for (let i=0; i < SEED_COUNT; i++)
{
  mongoose.connect(process.env.MONGODB_URI, {poolSize: 10});
  let user = new UserModel();
  user.username = 'oldmacdonald'+i;
  user.email = 'oldmacdonald'+i+'@gmail.com';
  user.setPassword('old'+i);
  user
    .save()
    .then(function (user) {
      console.log('Added user:' + user.email);
      return ItemModel.create(
        {title: 'Cow'+i, description: 'Black cow, with '+i+' white spots', seller: user});
    }).then(function () {
        mongoose.disconnect();
  });
}

console.log("done seeding");