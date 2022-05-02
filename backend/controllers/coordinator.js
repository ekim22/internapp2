const Student = require('../models/student');
const Coordinator = require('../models/coordinator');
const BioApps = require('../models/bio/form');


module.exports.getApplications = (req, res) => {
  Coordinator.findOne({_id: req.userData.userId})
      .then((coordinator) => {
        Student.find({appType: coordinator.dept}).then((studentApplications) => {
          const applications = [];
          for (const app of studentApplications) {
            applications.push({
              email: app.email,
              name: app.name,
              progress: app.appProgress,
              status: app.appStatus,
              type: app.appType,
              _id: app._id,
            });
          }
          res.status(200).json({
            studentApplications: applications,
          });
        });
      });
};

module.exports.getApplication = (req, res) => {
  const dept = req.query.dept;
  const appid = req.query.appid;

  if (dept === 'bio') {
    BioApps.findOne({userId: appid})
        .then(
            (application) => {
              console.log(application);
              res.status(200).json({
                message: 'ok',
              });
            },
        );
  }
};

module.exports.approveApplication = (req, res) => {
  if (!req.body.studentId) {
    res.status(400).json({
      message: 'Field "studentId" cannot be empty!',
    });
  }
  Student.findOneAndUpdate({_id: req.body.studentId}, {appStatus: 'Approved'})
      .then(() => {
        res.status(200).json({
          message: 'Application has been approved.',
        });
      }).catch(() => {
        res.status(500).json({
          message: 'Server was unable to process the request.',
        });
      });
};
