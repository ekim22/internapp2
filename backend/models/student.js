const User = require('./user');
const mongoose = require('mongoose');

const Student = User.discriminator('Student', new mongoose.Schema({
  appType: {type: String},
  appStatus: {type: String},
  appProgress: {type: Number},
}));

module.exports = Student;
