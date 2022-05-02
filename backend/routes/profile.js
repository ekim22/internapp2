const express = require('express');

const checkAuth = require('../middleware/check-auth');
const profileController = require('../controllers/profile');

const router = express.Router();

router.get('', checkAuth, profileController.getProfile);

module.exports = router;
