const express = require('express');

const Post = require('../models/post');

const router = express.Router();

router.get('', (req, res, next) => {
  Post.find()
      .then((documents) => {
        res.status(200).json({
          message: 'Posts sent!',
          posts: documents,
        });
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

router.post('', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(
      (post) => {
        res.status(201).json({
          message: 'Post created!',
          postId: post._id,
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
