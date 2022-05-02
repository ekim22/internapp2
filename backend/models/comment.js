const mongoose = require('mongoose');

const commentThreadSchema = mongoose.Schema({
  appId: {type: String, required: true},
  threadAuthor: {type: String, required: true},
  threadSubject: {type: String, required: true},
  comments: [{
    profile: {type: mongoose.Schema.Types.ObjectId, ref: 'Profile'},
    comment: {type: String},
    commentAuthor: {type: String},
    _id: false,
  }],
});

module.exports = mongoose.model('Comment', commentThreadSchema);
