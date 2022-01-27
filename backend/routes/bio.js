const express = require('express');

const checkAuth = require('../middleware/check-auth');
const fileOps = require('../middleware/file');
const bioController = require('../controllers/bio');

const router = express.Router();

/* Bio application routes */
router.get('', checkAuth, bioController.getApp);
router.post('/save', checkAuth, bioController.saveApp);

/* Bio document routes */
router.get('/doc/:fileType/:filePath/:fileName', checkAuth, bioController.downloadDoc);
router.post('/doc/upload', checkAuth, fileOps.storeDocument, bioController.uploadDoc);
router.delete('/doc/:fileType', checkAuth, bioController.deleteDoc);

module.exports = router;
