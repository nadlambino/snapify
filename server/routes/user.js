const express = require('express')
const router = express.Router()
const { createUser, getUsers } = require('./../controllers/UserController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, createUser)
router.get('/', getUsers )

module.exports = router
