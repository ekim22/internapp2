const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
};

const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type!');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  },
});

const docStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/docs');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const fileType = req.body.fileType;
    cb(null, name + '-' + Date.now() + '.' + fileType);
  },
});

module.exports.storeImage = multer({storage: imgStorage}).single('image');
// TODO write post about how the name here only needs to match
//  with the name field in the FormData object associated with the file
module.exports.storeDocument = multer({storage: docStorage}).single('document');
