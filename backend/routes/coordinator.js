const express = require('express');

const checkAuth = require('../middleware/check-auth');
const coordinatorController = require('../controllers/coordinator');

const router = express.Router();

router.get('/departments', checkAuth, coordinatorController.getApplications);
router.get('/application', checkAuth, coordinatorController.getApplication);
router.post('/approve-application', checkAuth, coordinatorController.approveApplication);
router.post('/flag-application', checkAuth, coordinatorController.flagApplication);

module.exports = router;
