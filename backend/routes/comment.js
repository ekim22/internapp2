const express = require('express');

const checkAuth = require('../middleware/check-auth');
const commentController = require('../controllers/comment');

const router = express.Router();

/* Routes for comment threads */
router.get('/:appid', checkAuth, commentController.getCommentThreads);
router.post('', checkAuth, commentController.createCommentThread);
router.delete('/:id', checkAuth, commentController.deleteCommentThread);

/* Routes for comments */
router.post('/new-comment', checkAuth, commentController.addComment);

module.exports = router;
