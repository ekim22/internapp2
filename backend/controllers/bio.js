const BioForm = require('../models/bio/form');
const {setAppProgress} = require('./student');


module.exports.downloadDoc = (req, res) => {
  const fileType = req.params.fileType;
  BioForm.findOne({userId: req.userData.userId})
      .then(
          (application) => {
            if (fileType === 'Essay') {
              if (application.documents.essay[0].creator.toString() !== req.userData.userId) {
                res.status(401).json({
                  message: 'Failed to get document!',
                });
              }
              res.download('/home/ethan/projects/mean-playground/backend/docs/' + req.params.filePath,
                  'req.params.fileName');
            } else if (fileType === 'Transcript') {
              if (application.documents.transcript[0].creator.toString() !== req.userData.userId) {
                res.status(401).json({
                  message: 'Failed to get document!',
                });

                res.download('/home/ethan/projects/mean-playground/backend/docs/' + req.params.filePath,
                    req.params.fileName);
              }
            } else {
              for (const doc of application.documents.otherDoc) {
                if (doc.fileType === fileType) {
                  if (doc.creator !== req.userData.userId) {
                    res.status(401).json({
                      message: 'Failed to get document!',
                    });
                  }
                  res.download('/home/ethan/projects/mean-playground/backend/docs/' + req.params.filePath,
                      req.params.fileName);
                }
              }
            }
          },
      )
      .catch(
          (err) => {
            res.status(400).json({
              message: 'There was an error downloading the document.',
              error: err,
            });
          },
      );
};

module.exports.uploadDoc = (req, res) => {
  if (req.body.fileType === 'Essay') {
    BioForm.findOneAndUpdate({'userId': req.userData.userId},
        {
          $set: {
            // TODO this part took some time to figure out. I wasn't sure how to push to a specific index in an array
            //  but all it took was the documentation revealing how to access embedded docs, as well as embedded docs
            //  in an array, then using the $set operator.
            'documents.essay.0': {
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
                document: bioForm.documents.essay,
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
    BioForm.findOneAndUpdate({'userId': req.userData.userId},
        {
          $set: {
            'documents.transcript.0': {
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
                document: bioForm.documents.transcript,
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
    BioForm.findOneAndUpdate({'userId': req.userData.userId},
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
                document: bioForm.documents.otherDoc[bioForm.documents.otherDoc.length - 1],
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
  console.log(req.params);
  if (req.params.fileType === 'Essay') {
    BioForm.findOneAndUpdate({'userId': req.userData.userId},
        {
          $unset: {
            'documents.essay.0': {
              fileName: '',
              fileType: '',
              filePath: '',
              dateUploaded: '',
              creator: '',
            },
          },
        }, {new: true})
        .then(
            (bioForm) => {
              res.status(200).json({
                message: 'Successfully deleted essay!',
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
    BioForm.findOneAndUpdate({'userId': req.userData.userId},
        {
          $unset: {
            'documents.transcript.0': {
              fileName: '',
              fileType: '',
              filePath: '',
              dateUploaded: '',
              creator: '',
            },
          },
        }, {new: true})
        .then(
            (bioForm) => {
              res.status(200).json({
                message: 'Successfully deleted transcript!',
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
  }
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
        setAppProgress(req);
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
