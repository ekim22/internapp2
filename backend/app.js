const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb://localhost:27017/node-angular")
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log("Failed to connect to database!")
  });

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers',
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods',
    "GET, POST, PATCH, DELETE, OPTIONS")
  next();
});

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(
    () => {
      console.log("Post saved!")
    });
  console.log(post);
  res.status(201).json({
      message: "Post added successfully!"
    });
})

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'w2a309fdsal3as',
      title: 'First server-side post',
      content: 'This is coming from server'
    },
    { id: 'slaa39dksal3wf',
      title: 'Second server-side post',
      content: 'This is coming from server'
    },
  ]
  res.status(200).json({
    message: 'Posts sent successfully',
    posts: posts
  })
})

module.exports = app;
