const Bio = require('../models/bio');


module.exports.getApps = (req, res) => {

};

module.exports.getApp = () => {};

module.exports.saveApp = (req, res) => {
  console.log(req.body);
  res.status(201).json({
    message: 'got here!',
  });
};
