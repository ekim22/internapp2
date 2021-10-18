const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  // eslint-disable-next-line max-len
  // unique: true doesn't validate input; It merely allows mongoose to do some optimizations
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
});

// eslint-disable-next-line max-len
// We pass mongoose-unique-validator here as a plugin to actually make sure the email is unique.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
