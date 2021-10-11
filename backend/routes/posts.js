const express = require('express');
const multer = require('multer');

const Post = require('../models/post');

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
};

const storage = multer.diskStorage({
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

router.get('', (req, res, next) => {
  Post.find()
      .then((documents) => {
        setTimeout(() => {
          res.status(200).json({
            message: 'Posts sent!',
            posts: documents,
          });
          console.log(documents);
        }, 500);
      });
});

router.get('/:id', (req, res, next) => {
  Post.findOne({_id: req.params.id}).then((post) => {
    if (post) {
      res.status(200).json({
        message: 'Post fetched!',
        post: post,
      });
    } else {
      res.status(404).json({
        message: 'Post not found!',
      });
    }
  },
  );
});

router.post('', multer({storage: storage}).single('image'),
    (req, res, next) => {
      const url = req.protocol + '://' + req.get('host');
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
      });
      post.save().then(
          (post) => {
            res.status(201).json({
              message: 'Post created!',
              post: post,
            });
          });
    });

router.patch('/:id', (req, res, next) => {
  Post.findOne({_id: req.params.id}, (err, foundPost) => {
    foundPost.title = req.body.title;
    foundPost.content = req.body.content;
    foundPost.save().then(
        () => {
          res.status(200).json({message: 'Post updated!'});
        },
    );
  });
});

router.delete('/:id', (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({message: 'Post deleted!'});
      });
});

module.exports = router;
