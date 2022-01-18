const express = require('express');

const checkAuth = require('../middleware/check-auth');
const fileOps = require('../middleware/file');
const bioController = require('../controllers/bio');

const router = express.Router();

router.get('', checkAuth, bioController.getApp);
router.post('/save', checkAuth, bioController.saveApp);
router.post('/doc/upload', checkAuth, fileOps.storeDocument, bioController.addDocs);


module.exports = router;
