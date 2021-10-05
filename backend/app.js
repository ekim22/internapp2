const express = require('express');

const app = express();

app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'w2a309fdsal3as',
      title: 'First server-side post',
      content: 'This is coming from server'
    },
    { id: 'slaa39dksal3wf',
      title: 'First server-side post',
      content: 'This is coming from server'
    },
  ]
  res.status(200).json({
    message: 'Posts sent successfully',
    posts: posts
  })
})

module.exports = app;
