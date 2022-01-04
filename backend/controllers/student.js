const User = require('../models/user');
const Student = require('../models/student');
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
      }); ;
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

module.exports.setAppProgress = (req, res) => {
  Student.findOne({_id: req.userData.userId}, (err, foundDoc) => {
    console.log(foundDoc);
    console.log(req.body.appProgress);
    foundDoc.appProgress = req.body.appProgress;
    foundDoc.markModified('appProgress');
    foundDoc.save().then(
        (result) => {
          console.log('result' + result);
          if (result) {
            res.status(200).json({
              message: 'App progress updated!',
            });
          } else {
            res.status(401).json({message: 'There was an error updating app progress!'});
          }
        },
    );
  });
};

