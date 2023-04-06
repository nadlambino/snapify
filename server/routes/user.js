const express = require('express')
const router = express.Router()
const { createUser } = require('./../controllers/UserController')

router.post('/', createUser)
router.get('/', (req, res) => res.json('Get user'))

module.exports = router
