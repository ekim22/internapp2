const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  // unique: true doesn't validate input; It merely allows mongoose to do some optimizations
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

module.exports = mongoose.model('User', userSchema);
