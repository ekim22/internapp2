const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/signup', (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  user.save().then(
      (user) => {
        res.status(201).json({
          message: 'User created!',
          user: user,
        });
      });
});

module.exports = router;
