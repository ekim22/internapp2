const express = require('express');

const checkAuth = require('../middleware/check-auth');
const bioController = require('../controllers/bio');

const router = express.Router();

router.get('', checkAuth, bioController.getApp);
router.post('/save', checkAuth, bioController.saveApp);


module.exports = router;
