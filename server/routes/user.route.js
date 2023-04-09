const express = require('express')
const router = express.Router()
const { createUser, getUsers } = require('./../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post('/', authMiddleware, createUser)
router.get('/', getUsers)

module.exports = router
