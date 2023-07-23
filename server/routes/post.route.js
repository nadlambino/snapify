const express = require('express')
const router = express.Router()
const PostController = require('./../controllers/post.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const uploadMiddleware = require('./../middlewares/upload.middleware')

router.post('/', authMiddleware, uploadMiddleware.multiple(5), PostController.createPost)
router.get('/feed', authMiddleware, PostController.getPosts)
router.post('/:id/comment', authMiddleware, PostController.commentPost)
router.post('/:id/react', authMiddleware, PostController.reactPost)
router.delete('/:id', authMiddleware, PostController.deletePost)

module.exports = router
