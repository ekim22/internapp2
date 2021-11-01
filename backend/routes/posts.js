const express = require('express');
const multer = require('multer');

const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');

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

router.get('', checkAuth, (req, res) => {
  const postQuery = Post.find({creator: req.userData.userId});
  let fetchedPosts;
  postQuery
      .skip(+req.query.pageSize * (+req.query.pageIndex))
      .limit(+req.query.pageSize);
  postQuery.find()
      .then((documents) => {
        fetchedPosts = documents;
        return Post.countDocuments({creator: req.userData.userId});
      })
      .then((count) => {
        setTimeout(() => {
          res.status(200).json({
            message: 'Posts sent!',
            posts: fetchedPosts,
            maxPosts: count,
          });
        }, 500);
      });
});

router.get('/:id', checkAuth, (req, res) => {
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

router.post('', checkAuth, multer({storage: storage}).single('image'),
    (req, res) => {
      const url = req.protocol + '://' + req.get('host');
      const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename,
        creator: req.userData.userId,
      });
      post.save().then(
          (post) => {
            res.status(201).json({
              message: 'Post created!',
              post: post,
            });
          });
    });

router.patch('/:id', checkAuth, multer({storage: storage}).single('image'),
    (req, res) => {
      let imagePath = req.body.imagePath;
      if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        imagePath = url + '/images/' + req.file.filename;
      }
      Post.findOne({_id: req.params.id}, (err, foundPost) => {
        foundPost.title = req.body.title;
        foundPost.content = req.body.content;
        foundPost.imagePath = imagePath;
        foundPost.save().then(
            () => {
              res.status(200).json({
                message: 'Post updated!',
              });
            },
        );
      });
    });

router.delete('/:id', checkAuth, (req, res) => {
  Post.findByIdAndDelete(req.params.id)
      .then(() => {
        res.status(200).json({message: 'Post deleted!'});
      });
});

module.exports = router;
