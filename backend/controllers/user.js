const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

module.exports.createUser = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Email and password cannot be empty!',
    });
  }
  bcrypt.hash(req.body.password, 10).then(
      (hash) => {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
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
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Email and password cannot be empty!',
    });
  }
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
        const token = jwt.sign({email: returnedUser.email, userId: returnedUser._id, role: returnedUser.role},
            'secret_this_should_be_longer', {expiresIn: '24h'});
        res.status(200).json({
          token: token,
          expiresIn: 86400,
          name: returnedUser.name,
          userRole: returnedUser.role,
        });
      })
      .catch((err) => {
        console.log(err);
      });
};

module.exports.getUserInfo = (req, res) => {
  User.findById(req.userData.userId)
      .then((returnedUser) => {
        res.status(200).json({
          name: returnedUser.name,
          email: returnedUser.email,
        });
      }).catch(() => {
        res.status(403).json({
          message: 'Could not get user info.',
        });
      });
};
