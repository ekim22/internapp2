const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const profileRoutes = require('./routes/profile');
const studentRoutes = require('./routes/student');
const coordinatorRoutes = require('./routes/coordinator');
const bioRoutes = require('./routes/bio');
const commentRoutes = require('./routes/comment');
const announcementsRoutes = require('./routes/announcements');

const app = express();

// Local
let mongoDB;
if (app.settings.env === 'development') {
  mongoDB = process.env.LOCAL_DB;
} else {
  mongoDB = process.env.PROD_DB;
}
// Atlas
const options = {useNewUrlParser: true, useUnifiedTopology: true};
mongoose.connect(mongoDB, options);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error: '));
mongoose.connection.once('open', () => {
  console.log('Connected to database!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(path.join('backend/images')));
app.use('/docs', express.static(path.join('backend/docs')));

// Angular server
const distDir = path.join(__dirname, '../dist');
app.use(express.static(distDir));
// app.get('/*', (req, res) => {
//   res.sendFile(distDir + '/mean-playground/index.html');
// });
console.log(distDir);
console.log(distDir + '/mean-playground/index.html');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS');
  next();
});

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'This is the root of the server!',
//   });
// });

app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/coordinator', coordinatorRoutes);
app.use('/api/bio', bioRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/announcements', announcementsRoutes);


module.exports = app;
