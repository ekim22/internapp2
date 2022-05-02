const User = require('./user');
const mongoose = require('mongoose');

const Coordinator = User.discriminator('Coordinator', new mongoose.Schema({
  dept: {type: String},
}));

module.exports = Coordinator;
