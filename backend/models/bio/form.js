const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  desiredInternshipSemester: {String},
  desiredInternshipYear: {String},
  concentration: {String},
  expectedGradSemester: {String},
  expectedGradYear: {String},
  overallGPA: {Number},
  programGPA: {Number},
  hoursCompleted: {Number},
  intendedProfession: {String},
});

module.exports = mongoose.model('BioApp', appSchema);
