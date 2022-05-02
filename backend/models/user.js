const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// This discriminatorKey is the field on which Users will be
//  distinguishable in mongoDB.
const options = {discriminatorKey: 'role'};

const userSchema = mongoose.Schema({
  // eslint-disable-next-line max-len
  // unique: true doesn't validate input; It merely allows mongoose to do some optimizations
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
}, options);

// eslint-disable-next-line max-len
// We pass mongoose-unique-validator here as a plugin to actually make sure the email is unique.
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
