const express = require('express')
const router = express.Router()
const { createPost } = require('./../controllers/post.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, createPost)

module.exports = router
