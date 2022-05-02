const mongoose = require('mongoose');

const announcementsSchema = mongoose.Schema({
  announcements: {type: String, required: true},
  dept: {type: String, required: true},
});

module.exports = mongoose.model('Announcements', announcementsSchema);
