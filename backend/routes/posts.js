const express = require('express');

const checkAuth = require('../middleware/check-auth');
const fileOps = require('../middleware/file');
const postController = require('../controllers/post');

const router = express.Router();


router.get('', checkAuth, postController.getPosts );
router.get('/:id', checkAuth, postController.getPost );
router.post('', checkAuth, fileOps.storeImage, postController.createPost );
router.patch('/:id', checkAuth, fileOps.storeImage, postController.updatePost );
router.delete('/:id', checkAuth, postController.deletePost );

module.exports = router;
