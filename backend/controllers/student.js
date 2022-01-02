const User = require('../models/user');
const Student = require('../models/student');

module.exports.getProgram = (req, res) => {
  Student.findOne({userId: req.userData.userId})
      .then((student) => {
        res.status(201).json({
          appType: student.appType,
        });
      });
};

module.exports.setProgram = (req, res) => {
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

