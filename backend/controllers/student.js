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

