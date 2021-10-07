const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect('mongodb://localhost:27017/node-angular')
    .then(() => {
      console.log('Connected to database!');
    })
    .catch(() => {
      console.log('Failed to connect to database!');
    });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'This is the root of the server!',
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
      .then((documents) => {
        res.status(200).json({
          message: 'Posts sent successfully',
          posts: documents,
        });
      });
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save().then(
      (result) => {
        res.status(201).json({
          message: 'Post added successfully!',
          postId: result._id,
        });
      });
});

app.delete('/api/posts/:id', (req, res, next) => {
  Post.findByIdAndDelete(req.params.id)
      .then(() => {
        console.log(req.params.id);
        res.status(200).json({message: 'Post deleted'});
      });
});

module.exports = app;
