const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.createUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(500).json({
      message: 'Email and password cannot be empty!',
    });
  }
  bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
          role: 'student',
        });
        user.save().then(
            (result) => {
              res.status(201).json({
                message: 'User created!',
                result: result,
              });
            }).catch((err) => {
          res.status(500).json({
            message: 'Failed to create account!',
          });
        });
      },
  );
};

module.exports.login = (req, res) => {
  let returnedUser;
  User.findOne({email: req.body.email})
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            message: 'Invalid credentials!',
          });
        } else {
          returnedUser = user;
        }
        return bcrypt.compare(req.body.password, user.password);
      })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            message: 'Invalid password!',
          });
        }
        // The expiresIn in the jwt is NOT the same as expiresIn in the res body.
        const token = jwt.sign({email: returnedUser.email, userId: returnedUser._id},
            'secret_this_should_be_longer', {expiresIn: '24h'});
        res.status(200).json({
          token: token,
          expiresIn: 86400,
        });
      })
      .catch(() => {
        res.status(401).json({
          message: 'Invalid credentials!',
        });
      })
  ;
};
