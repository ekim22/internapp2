const express = require('express');

const checkAuth = require('../middleware/check-auth');
const studentController = require('../controllers/student');

const router = express.Router();

router.get('', checkAuth, studentController.getProgram);
router.post('', checkAuth, studentController.setProgram);

module.exports = router;
