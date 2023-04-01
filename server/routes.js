const express = require('express')
const router = express.Router()
const {createTodo} = require('./controllers/TodoController')

router.post('/todo', createTodo)

module.exports = router
