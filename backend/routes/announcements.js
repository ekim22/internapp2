const express = require('express');

const checkAuth = require('../middleware/check-auth');
const announcementsController = require('../controllers/announcements');

const router = express.Router();

router.post('', checkAuth, announcementsController.updateAnnouncements);
router.get('', checkAuth, announcementsController.getAnnouncements);


module.exports = router;
