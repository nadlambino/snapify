const express = require('express')
const router = express.Router()
const { createUser } = require('./controllers/UserController')

router.get('/', (req, res) => res.json('Welcome to feed API'))
router.post('/user', createUser)
router.get('/user', (req, res) => res.json('yow'))

module.exports = router
