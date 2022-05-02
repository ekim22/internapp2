const User = require('../models/user');
const Student = require('../models/student');
const BioApps = require('../models/bio/form');
const bcrypt = require('bcrypt');

module.exports.createStudent = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(500).json({
      message: 'Name, Email, and Password cannot be empty!',
    });
  }
  bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const student = new Student({
          name: req.body.name,
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
  Student.findOne({_id: req.userData.userId})
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

module.exports.setAppType = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(
        req.userData.userId,
        {$set: {'appType': req.body.appType}});
    res.status(201).json({
      message: 'Program type updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update program type!',
    });
  }


  // User.findOne({_id: req.userData.userId})
  //     .then((user) => {
  //       const student = new Student(user);
  //       student.appType = req.body.appType;
  //       student.save()
  //           .then(
  //               () => {
  //                 res.status(201).json({
  //                   message: 'Program type updated!',
  //                 });
  //               },
  //           )
  //           .catch(
  //               () => {
  //                 res.status(500).json({
  //                   message: 'Failed to update program type!',
  //                 });
  //               },
  //           );
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         message: 'Failed to set program type!',
  //       });
  //     });
};

module.exports.getAppStatus = (req, res) => {
  Student.findOne({_id: req.userData.userId})
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

module.exports.setAppStatus = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(
        req.userData.userId,
        {$set: {'appStatus': req.body.appStatus}});
    res.status(201).json({
      message: 'Application status updated!',
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to update application status.',
    });
  }

  // User.findOne({_id: req.userData.userId})
  //     .then((user) => {
  //       const student = new Student(user);
  //       student.appStatus = req.body.appStatus;
  //       student.save()
  //           .then(
  //               () => {
  //                 res.status(201).json({
  //                   message: 'Application status updated!',
  //                 });
  //               },
  //           )
  //           .catch(
  //               () => {
  //                 res.status(500).json({
  //                   message: 'Failed to update application status!',
  //                 });
  //               },
  //           );
  //     })
  //     .catch(() => {
  //       res.status(500).json({
  //         message: 'Failed to set application status!',
  //       });
  //     });
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

module.exports.setAppProgress = async (req, res) => {
  try {
    await Student.findByIdAndUpdate(
        req.userData.userId,
        {$set: {'appProgress': req.body.appProgress}},
        {
          runValidators: true,
        },
    ).exec().then(() => {
      res.status(200).json({
        message: 'Progress updated!',
      });
    });
  } catch (err) {
    err.stack;
  }
};

module.exports.getAppSteps = async (req, res) => {
  try {
    const application = await BioApps.findOne({userId: req.userData.userId})
        .select(
            'studentAcademicInfo.completed ' +
        'emergencyContactInfo.completed ' +
        'mentorInfo.completed ' +
        'internshipInfo.completed ' +
        'educationalObjectives.completed ' +
        'documents.completed ' +
        'signature.completed')
        .lean();
    if (!application) {
      return res.status(404).json({
        message: 'Could not find application.',
      });
    }
    const appSteps = [
      {'name': 'Student Academic Info', 'completed': application.studentAcademicInfo.completed},
      {'name': 'Emergency Contact Info', 'completed': application.emergencyContactInfo.completed},
      {'name': 'Mentor Info', 'completed': application.mentorInfo.completed},
      {'name': 'Internship Info', 'completed': application.internshipInfo.completed},
      {'name': 'Educational Objectives', 'completed': application.educationalObjectives.completed},
      {'name': 'Documents', 'completed': application.documents.completed},
      {'name': 'Signature', 'completed': application.signature.completed},
    ];
    res.status(200).json({
      appSteps: appSteps,
    });
  } catch (err) {
    console.log(err.stack);
  }
};

module.exports.getAppInfo = async (req, res) => {
  try {
    const student = await Student.findById(req.userData.userId)
        .select('appType appStatus appProgress')
        .lean();

    if (!student) {
      return res.status(404).json({
        message: 'Could not find student.',
      });
    }

    res.status(200).json({
      appType: student.appType,
      appStatus: student.appStatus,
      appProgress: student.appProgress,
    });
  } catch (err) {
    console.log(err.stack);
  }
};

// module.exports.getAppInfo = async (req, res) => {
//   const appInfo = {
//     appType: '',
//     appStatus: '',
//     appProgress: '',
//     appSteps: [],
//   };
//   try {
//     const student = await Student.findById(req.userData.userId)
//         .select('appType appStatus appProgress')
//         .lean();
//     const application = await BioApps.findOne({userId: req.userData.userId})
//         .select(
//             'studentAcademicInfo.completed ' +
//           'emergencyContactInfo.completed ' +
//           'mentorInfo.completed ' +
//           'internshipInfo.completed ' +
//           'educationalObjectives.completed ' +
//           'documents.completed ' +
//           'signature.completed')
//         .lean();
//
//     if (!student) {
//       return res.status(404).json({
//         message: 'Could not find student.',
//       });
//     }
//     if (!application) {
//       return res.status(404).json({
//         message: 'Could not find application.',
//       });
//     }
//     appInfo.appType = student.appType;
//     appInfo.appStatus = student.appStatus;
//     appInfo.appProgress = student.appProgress;
//     appInfo.appSteps = [
//       {'name': 'Student Academic Info', 'completed': application.studentAcademicInfo.completed},
//       {'name': 'Emergency Contact Info', 'completed': application.emergencyContactInfo.completed},
//       {'name': 'Mentor Info', 'completed': application.mentorInfo.completed},
//       {'name': 'Internship Info', 'completed': application.internshipInfo.completed},
//       {'name': 'Educational Objectives', 'completed': application.educationalObjectives.completed},
//       {'name': 'Documents', 'completed': application.documents.completed},
//       {'name': 'Signature', 'completed': application.signature.completed},
//     ];
//     res.status(200).json({
//       appInfo: appInfo,
//     });
//   } catch (err) {
//     err.stack;
//   }
//
//   // Student.findOne({_id: req.userData.userId})
//   //     .then((student) => {
//   //       appInfo.appType = student.appType;
//   //       appInfo.appProgress = student.appProgress;
//   //       BioApps.findOne({userId: req.userData.userId}, (err, application) => {
//   //         if (err) {
//   //           res.status(400).json({
//   //             message: 'There was an error.',
//   //           });
//   //         } else if (application === null) {
//   //           res.status(404).json({
//   //             message: 'Application not found!',
//   //           });
//   //         } else {
//   //           appInfo.appSteps = [
//   //             {'name': 'Student Academic Info', 'completed': application.studentAcademicInfo.completed},
//   //             {'name': 'Emergency Contact Info', 'completed': application.emergencyContactInfo.completed},
//   //             {'name': 'Mentor Info', 'completed': application.mentorInfo.completed},
//   //             {'name': 'Internship Info', 'completed': application.internshipInfo.completed},
//   //             {'name': 'Educational Objectives', 'completed': application.educationalObjectives.completed},
//   //             {'name': 'Documents', 'completed': application.documents.completed},
//   //             {'name': 'Signature', 'completed': application.signature.completed},
//   //           ];
//   //
//   //           res.status(201).json({
//   //             appInfo: appInfo,
//   //           });
//   //         }
//   //       });
//   //     })
//   //     .catch((err) => {
//   //       res.status(401).json({
//   //         message: err,
//   //       });
//   //     });
// };
