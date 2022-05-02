const express = require('express');

const checkAuth = require('../middleware/check-auth');
const fileOps = require('../middleware/file');
const bioController = require('../controllers/bio');

const router = express.Router();

/* Bio application routes */
router.get('', checkAuth, bioController.getApp);
router.post('/save', checkAuth, bioController.saveApp);

/* Bio document routes */
router.get('/doc/:appId/:fileType/:filePath/:fileName', checkAuth, bioController.downloadDoc);
router.post('/doc/upload', checkAuth, fileOps.storeDocument, bioController.uploadDoc);
router.delete('/doc/delete/:fileType/:filePath', checkAuth, bioController.deleteDoc);

/* Bio application instruction routes */
router.post('/update-instructions', checkAuth, bioController.updateInstructions);
router.get('/get-instructions', checkAuth, bioController.getInstructions);

module.exports = router;
