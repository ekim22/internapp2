const express = require('express');
const multer = require('multer');
const upload = multer();

const checkAuth = require('../middleware/check-auth');
const bioController = require('../controllers/bio');

const router = express.Router();


router.post('', checkAuth, upload.none(), bioController.saveApp );


module.exports = router;
