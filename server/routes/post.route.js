const express = require('express')
const router = express.Router()
const PostController = require('./../controllers/post.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, PostController.createPost)
router.get('/feed', authMiddleware, PostController.getPosts)
router.post('/:id/comment', authMiddleware, PostController.commentPost)

module.exports = router
