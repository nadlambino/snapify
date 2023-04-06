require('./bootstrap.js')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const parser = require('body-parser')

const router = require('./routes/user.js')

app.use(cors())
app.use(express.json())
app.use(parser.urlencoded({extended: false}))
app.use(parser.json())

app.get('/', (req, res) => res.json('Welcome to Feed API'))
app.use('/users', router)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server started. Listening at port ${process.env.PORT}`)
        })
    })
    .catch(error => {
        console.log(`Failed to connect to the database.`)
        console.log(`Error: `, error)
    })
