const express = require('express');

const checkAuth = require('../middleware/check-auth');
const studentController = require('../controllers/student');

const router = express.Router();

router.post('/signup', studentController.createStudent);
router.get('/appType', checkAuth, studentController.getAppType);
router.post('/appType', checkAuth, studentController.setAppType);
router.get('/appStatus', checkAuth, studentController.getAppStatus);
router.post('/appStatus', checkAuth, studentController.setAppStatus);
router.get('/appProgress', checkAuth, studentController.getAppProgress);
router.post('/appProgress', checkAuth, studentController.setAppProgress);
router.get('/appInfo', checkAuth, studentController.getAppInfo);


module.exports = router;
