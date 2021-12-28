const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    // This is middleware so we want it to continue on to the next code.
    next();
  } catch (err) {
    // 401 is not authenticated
    res.status(401).json({message: 'No token has been found!'});
  }
};
