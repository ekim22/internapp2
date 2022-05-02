const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  name: {type: String, required: true},
  email: {type: String, required: true},
  about: {type: String},
  imgPath: {type: String},
});

module.exports = mongoose.model('Profile', profileSchema);
