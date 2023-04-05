require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = require('./routes');
const cors = require('cors')

app.use(cors)
app.use(express.json())
app.use(router)

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
