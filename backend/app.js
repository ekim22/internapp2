const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const bioRoutes = require('./routes/bio');

const app = express();

mongoose.connect('mongodb://localhost:27017/node-angular')
    .then(() => {
      console.log('Connected to database!');
    })
    .catch(() => {
      console.log('Failed to connect to database!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'This is the root of the server!',
  });
});

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/bio', bioRoutes);


module.exports = app;
