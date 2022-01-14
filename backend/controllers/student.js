const User = require('../models/user');
const Student = require('../models/student');
const BioForm = require('../models/bio/form');
const bcrypt = require('bcrypt');

module.exports.createStudent = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).json({
      message: 'Email and password cannot be empty!',
    });
  }
  bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const student = new Student({
          email: req.body.email,
          password: hash,
        });
        student.save().then(
            (result) => {
              res.status(201).json({
                message: 'User created!',
                result: result,
              });
            }).catch((err) => {
          res.status(500).json({
            message: 'Failed to create account!',
          });
        });
      },
  );
};

module.exports.getAppType = (req, res) => {
  Student.findOne({userId: req.userData.userId})
      .then((student) => {
        res.status(201).json({
          appType: student.appType,
        });
      })
      .catch(() => {
        res.status(401).json({
          message: 'Could not get app type!',
        });
      });
};

module.exports.setAppType = (req, res) => {
  User.findOne({userId: req.userData.userId})
      .then((user) => {
        const student = new Student(user);
        student.appType = req.body.appType;
        student.save()
            .then(
                () => {
                  res.status(201).json({
                    message: 'Program type updated!',
                  });
                },
            )
            .catch(
                () => {
                  res.status(500).json({
                    message: 'Failed to update program type!',
                  });
                },
            );
      })
      .catch(() => {
        res.status(500).json({
          message: 'Failed to set program type!',
        });
      });
};

module.exports.getAppStatus = (req, res) => {
  Student.findOne({userId: req.userData.userId})
      .then((student) => {
        res.status(201).json({
          appStatus: student.appStatus,
        });
      })
      .catch(() => {
        res.status(401).json({
          message: 'Could not get app status!',
        });
      });
};

module.exports.setAppStatus = (req, res) => {
  User.findOne({userId: req.userData.userId})
      .then((user) => {
        const student = new Student(user);
        student.appStatus = req.body.appStatus;
        student.save()
            .then(
                () => {
                  res.status(201).json({
                    message: 'Application status updated!',
                  });
                },
            )
            .catch(
                () => {
                  res.status(500).json({
                    message: 'Failed to update application status!',
                  });
                },
            );
      })
      .catch(() => {
        res.status(500).json({
          message: 'Failed to set application status!',
        });
      });
};

module.exports.getAppProgress = (req, res) => {
  Student.findOne({_id: req.userData.userId})
      .then((student) => {
        res.status(201).json({
          appProgress: student.appProgress,
        });
      })
      .catch(() => {
        res.status(401).json({
          message: 'Could not get app progress!',
        });
      });
};

module.exports.setAppProgress = (req) => {
  Student.findOne({_id: req.userData.userId}, (err, foundStudent) => {
    foundStudent.appProgress = req.body.appProgress;
    foundStudent.markModified('appProgress');
    foundStudent.save();
  });
};

module.exports.getAppSteps = (req, res) => {

};

module.exports.getAppInfo = (req, res) => {
  const appInfo = {
    appType: '',
    appProgress: '',
    appSteps: [],
  };
  Student.findOne({_id: req.userData.userId})
      .then((student) => {
        appInfo.appType = student.appType;
        appInfo.appProgress = student.appProgress;
        BioForm.findOne({userId: req.userData.userId}, (err, application) => {
          if (err) {
            res.status(401).json({
              error: err,
            });
          } else {
            appInfo.appSteps = [
              {'name': 'Student Academic Info', 'completed': application.studentAcademicInfo.completed},
              {'name': 'Emergency Contact Info', 'completed': application.emergencyContactInfo.completed},
              {'name': 'Mentor Info', 'completed': application.mentorInfo.completed},
              {'name': 'Internship Info', 'completed': application.internshipInfo.completed},
              {'name': 'Educational Objectives', 'completed': application.educationalObjectives.completed},
              {'name': 'Documents', 'completed': application.documents.completed},
              {'name': 'Signature', 'completed': application.signature.completed},
            ];

            res.status(201).json({
              appInfo: appInfo,
            });
          }
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: err,
        });
      });
};
