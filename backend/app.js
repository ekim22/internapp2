const path = require('path');
const express = require('express');
const fs = require('fs');
const dotenv = require('dotenv').config();
const cors = require('cors');
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
app.use(cors());

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

// Make docs directory; Should replace this with an S3 filesystem though.
if (!fs.existsSync(__dirname + '/docs')) {
  console.log('making docs directory...');
  fs.mkdirSync(__dirname + '/docs');
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/images', express.static(path.join('backend/images')));
app.use('/docs', express.static(path.join('backend/docs')));
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/coordinator', coordinatorRoutes);
app.use('/api/bio', bioRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/announcements', announcementsRoutes);

// Angular server
const distDir = path.join(__dirname, '../dist');
app.use(express.static(path.join(distDir + '/mean-playground')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distDir + '/mean-playground/index.html'));
});

module.exports = app;
