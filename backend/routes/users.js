const express = require('express');
const userController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('/signup', userController.createUser );
router.post('/login', userController.login );
router.get('/info', checkAuth, userController.getUserInfo );

module.exports = router;
