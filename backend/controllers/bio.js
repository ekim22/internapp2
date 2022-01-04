const BioForm = require('../models/bio/form');


module.exports.getApps = (req, res) => {

};

module.exports.getApp = (req, res) => {
  BioForm.findOne({userId: req.userData.userId})
      .then((application) => {
        res.status(201).json({
          application: application,
        });
      });
};

module.exports.saveApp = (req, res) => {
  BioForm.findOneAndUpdate({userId: req.userData.userId}, req.body, {upsert: true, new: true})
      .then((savedFormData) => {
        res.status(201).json({
          message: 'Application updated!',
          savedFormData: savedFormData,
        });
      })
      .catch(() => {
        res.status(500).json({
          message: 'Failed to update application!',
        });
      });
};
