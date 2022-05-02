const mongoose = require('mongoose');

const studentAcademicInfoSchema = mongoose.Schema({
  desiredInternshipSemester: {type: String},
  desiredInternshipYear: {type: String},
  concentration: {type: String},
  expectedGradSemester: {type: String},
  expectedGradYear: {type: String},
  overallGPA: {type: Number},
  programGPA: {type: Number},
  hoursCompleted: {type: Number},
  intendedProfession: {type: String},
  completed: {type: Boolean},
}, {_id: false});

const emergencyContactInfoSchema = mongoose.Schema({
  contactFirstName: {type: String},
  contactLastName: {type: String},
  contactAddress: {type: String},
  contactCity: {type: String},
  contactState: {type: String},
  contactZip: {type: String},
  contactPhone: {type: String},
  contactEmail: {type: String},
  completed: {type: Boolean},
}, {_id: false});

const mentorInfoSchema = mongoose.Schema({
  mentorFirstName: {type: String},
  mentorLastName: {type: String},
  mentorOffice: {type: String},
  mentorPhone: {type: String},
  mentorEmail: {type: String},
  completed: {type: Boolean},
}, {_id: false});

const internshipInfoSchema = mongoose.Schema({
  committeeSites: {type: String},
  siteName: {type: String},
  siteSpecialty: {type: String},
  siteAddress: {type: String},
  siteCity: {type: String},
  siteState: {type: String},
  siteZip: {type: String},
  sitePhone: {type: String},
  managerFirstName: {type: String},
  managerLastName: {type: String},
  managerTitle: {type: String},
  managerEmail: {type: String},
  preceptorFirstName: {type: String},
  preceptorLastName: {type: String},
  preceptorPhone: {type: String},
  preceptorEmail: {type: String},
  preceptorTitle: {type: String},
  preceptorManagerStatus: {type: String},
  studentEmployedHere: {type: String},
  studentPosition: {type: String},
  studentPayStatus: {type: String},
  studentAvgWorkingHours: {type: String},
  studentInternshipVsWork: {type: String},
  studentPersonalConnection: {type: String},
  completed: {type: Boolean},
}, {_id: false});

const educationalObjectivesSchema = mongoose.Schema({
  firstObjective: {type: String},
  secondObjective: {type: String},
  thirdObjective: {type: String},
  completed: {type: Boolean},
}, {_id: false});

const documentsSchema = mongoose.Schema({
  essay: [{
    fileName: {type: String},
    fileType: {type: String},
    filePath: {type: String},
    dateUploaded: {type: Date},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  }],
  transcript: [{
    fileName: {type: String},
    fileType: {type: String},
    filePath: {type: String},
    dateUploaded: {type: Date},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  }],
  otherDoc: [{
    fileName: {type: String},
    fileType: {type: String},
    filePath: {type: String},
    dateUploaded: {type: Date},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  }],
  completed: {type: Boolean},
}, {_id: false});

const signatureSchema = mongoose.Schema({
  printedSignature: {type: String},
  completed: {type: Boolean},
}, {_id: false});

const bioFormSchema = mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  studentAcademicInfo: studentAcademicInfoSchema,
  emergencyContactInfo: emergencyContactInfoSchema,
  mentorInfo: mentorInfoSchema,
  internshipInfo: internshipInfoSchema,
  educationalObjectives: educationalObjectivesSchema,
  documents: documentsSchema,
  signature: signatureSchema,
});

module.exports = mongoose.model('BioApp', bioFormSchema);
