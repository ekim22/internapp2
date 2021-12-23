const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
  studentAcademicInfo: {type: String},
  emergencyContactInfo: {type: String},
  mentorInfo: {type: String, required: true},
  internshipInfo: {type: String},
  educationalObjectives: {type: String},
  documents: {type: String},
  signature: {type: String},
});

const sitesSchema = mongoose.Schema({
  siteName: {type: String, required: true},
  siteDesc: {type: String, required: true},
});

module.exports = mongoose.model('BioApp', appSchema);
module.exports = mongoose.model('BioSites', sitesSchema);
