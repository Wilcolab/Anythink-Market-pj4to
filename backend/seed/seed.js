


require("../models/User");
require("../models/Item");
require("../models/Comment");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

let UserModel = require('mongoose').model('User');
let ItemModel = require('mongoose').model('Item');

let user = new UserModel();
user.username = 'oldmcdonald9';
user.email = 'oldmcdonald9@gmail.com';
user.setPassword('old');
user
  .save()
    .then(function (user) {
      return ItemModel.create(
        { title: 'mouse3', description: 'mickey3', seller: user });
    }).then(function (){
      mongoose.disconnect();
    });

// UserModel.findOne({ username:'bobby' }).exec()
//   .then(function (user) {
//     return ItemModel.create(
//       { title: 'cat', description: 'miao', seller: user });
//   }).then(function (){
//     mongoose.disconnect();
// });
console.log("done seeding");