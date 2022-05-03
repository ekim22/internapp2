const BioApps = require('../models/bio/form');
const BioInstructions = require('../models/bio/instructions');
const BioAnnouncements = require('../models/announcements');

module.exports.downloadDoc = async (req, res) => {
  let appId;
  if (req.params.appId === 'student') {
    appId = req.userData.userId;
  } else {
    appId = req.params.appId;
  }
  const fileType = req.params.fileType;
  if (fileType === 'Essay') {
    try {
      const doc = await BioApps.findOne({'userId': appId,
        'documents.essay': {
          $elemMatch: {
            'fileType': req.params.fileType, 'creator': appId,
          },
        }})
          .select('documents.essay.$')
          .lean();
      if (doc) {
        res.download('/home/ethan/projects/mean-playground/backend/docs/' + req.params.filePath,
            req.params.fileName);
      } else {
        res.status(400).json({
          message: 'Failed to get document!',
        });
      }
    } catch (err) {
      res.status(401).json({
        message: 'Unable to retrieve document!',
      });
    }
  } else if (fileType === 'Transcript') {
    try {
      const doc = await BioApps.findOne({'userId': appId,
        'documents.transcript': {
          $elemMatch: {
            'fileType': req.params.fileType, 'creator': appId,
          },
        }})
          .select('documents.transcript.$')
          .lean();
      if (doc) {
        res.download('/home/ethan/projects/mean-playground/backend/docs/' + req.params.filePath,
            req.params.fileName);
      } else {
        res.status(400).json({
          message: 'Failed to get document!',
        });
      }
    } catch (err) {
      res.status(401).json({
        message: 'Unable to retrieve document!',
      });
    }
  } else {
    try {
      const doc = await BioApps.findOne({'userId': appId,
        'documents.otherDoc': {
          $elemMatch: {
            'fileType': req.params.fileType, 'creator': appId,
          },
        }})
          .select('documents.otherDoc.$')
          .lean();
      if (doc) {
        res.download('/home/ethan/projects/mean-playground/backend/docs/' + req.params.filePath,
            req.params.fileName);
      } else {
        res.status(400).json({
          message: 'Failed to get document!',
        });
      }
    } catch (err) {
      res.status(401).json({
        message: 'Unable to retrieve document!',
      });
    }
  }
};

module.exports.uploadDoc = (req, res) => {
  console.log(req.body);
  if (req.body.fileType === 'Essay') {
    BioApps.findOneAndUpdate({'userId': req.userData.userId},
        {
          $set: {
            // TODO this part took some time to figure out. I wasn't sure how to push to a specific index in an array
            //  but all it took was the documentation revealing how to access embedded docs, as well as embedded docs
            //  in an array, then using the $set operator.
            'documents.essay': {
              ...req.body,
              filePath: req.file.filename,
              creator: req.userData.userId,
            },
          },
        }, {new: true})
        .then(
            (bioForm) => {
              res.status(200).json({
                message: 'Successfully uploaded essay!',
                documents: bioForm.documents,
              });
            },
        )
        .catch(
            (err) => {
              res.status(400).json({
                message: 'There was an error uploading your document.',
                error: err,
              });
            },
        );
  } else if (req.body.fileType === 'Transcript') {
    BioApps.findOneAndUpdate({'userId': req.userData.userId},
        {
          $set: {
            'documents.transcript': {
              ...req.body,
              filePath: req.file.filename,
              creator: req.userData.userId,
            },
          },
        }, {new: true})
        .then(
            (bioForm) => {
              res.status(200).json({
                message: 'Successfully uploaded transcript!',
                documents: bioForm.documents,
              });
            },
        )
        .catch(
            (err) => {
              res.status(400).json({
                message: 'There was an error uploading your document.',
                error: err,
              });
            },
        );
  } else {
    // TODO: this is not ideal. If I can get a specific range of "other" doc types from Latanya
    //  this would be much smoother to implement, so plan to ask her about getting one.
    console.log('Other req.body: ', req.body);
    console.log(req.body.fileType);
    BioApps.findOneAndUpdate({'userId': req.userData.userId},
        {
          $push: {
            'documents.otherDoc': {
              ...req.body,
              filePath: req.file.filename,
              creator: req.userData.userId,
            },
          },
        }, {new: true})
        .then(
            (bioForm) => {
              res.status(200).json({
                message: 'Successfully uploaded document!',
                documents: bioForm.documents,
              });
            },
        )
        .catch(
            (err) => {
              res.status(400).json({
                message: 'There was an error uploading your document.',
                error: err,
              });
            },
        );
  }
};

module.exports.deleteDoc = (req, res) => {
  if (req.params.fileType === 'Essay') {
    BioApps.findOneAndUpdate({'userId': req.userData.userId},
        {
          $pull: {
            'documents.essay': {
              creator: req.userData.userId,
            },
          },
        }, {new: true})
        .then(
            (bioForm) => {
              res.status(200).json({
                message: 'Successfully deleted essay!',
                documents: bioForm.documents,
              });
            },
        )
        .catch(
            (err) => {
              res.status(400).json({
                message: 'There was an error deleting your document.',
                error: err,
              });
            },
        );
  } else if (req.params.fileType === 'Transcript') {
    BioApps.findOneAndUpdate({'userId': req.userData.userId},
        {
          $pull: {
            'documents.transcript': {
              creator: req.userData.userId,
            },
          },
        }, {new: true})
        .then(
            (bioForm) => {
              res.status(200).json({
                message: 'Successfully deleted transcript!',
                documents: bioForm.documents,
              });
            },
        )
        .catch(
            (err) => {
              res.status(400).json({
                message: 'There was an error deleting your document.',
                error: err,
              });
            },
        );
  } else {
    BioApps.findOneAndUpdate({
      'userId': req.userData.userId,
      'documents.otherDoc': {
        $elemMatch: {
          'fileType': req.params.fileType},
      },
    }, {
      $pull: {
        'documents.otherDoc': {
          filePath: req.params.filePath,
          fileType: req.params.fileType,
          creator: req.userData.userId,
        },
      },
    }, {new: true})
        .then(
            (bioForm) => {
              res.status(200).json({
                message: 'Successfully deleted document of type: ' + req.params.fileType + '!',
                documents: bioForm.documents,
              });
            },
        )
        .catch(
            (err) => {
              console.log(err);
              res.status(400).json({
                message: 'There was an error deleting your document.',
                error: err,
              });
            },
        );
  }
};

module.exports.getApp = (req, res) => {
  const appid = req.query.appid ? req.query.appid : req.userData.userId;
  BioApps.findOne({userId: appid})
      .then((application) => {
        res.status(201).json({
          application: application,
        });
      });
};

module.exports.saveApp = (req, res) => {
  BioApps.findOneAndUpdate({userId: req.userData.userId}, req.body, {upsert: true, new: true})
      .then( (savedFormData) => {
        res.status(201).json({
          message: 'Application updated!',
          savedFormData: savedFormData,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: err.message,
        });
      });
};

module.exports.updateInstructions = (req, res) => {
  BioInstructions.findOne().then(
      (document) => {
        let instructionsDocument = document;
        if (!instructionsDocument) {
          instructionsDocument = new BioInstructions({
            instructions: req.body.newInstructions,
          });
        }
        instructionsDocument.instructions = req.body.newInstructions;
        instructionsDocument.save().then(
            (result) => {
              res.status(200).json({
                message: 'Instructions updated!',
              });
            },
        )
            .catch((err) => {
              res.status(400).json({
                message: 'Failed to update instructions.',
              });
            });
      },
  );
};

module.exports.getInstructions = (req, res) => {
  BioInstructions.findOne().then((document) => {
    if (!document) {
      res.status(204).json({
        message: 'No instructions exist yet!',
      });
    } else {
      res.status(200).json({
        message: 'Instructions retrieved!',
        instructions: document.instructions,
      });
    }
  });
};


