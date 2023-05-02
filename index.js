const express = require('express')
const reviews = require('./routes/reviews')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

require('dotenv').config()
const { MONGODB } = process.env

mongoose.connect(MONGODB);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once('connected', () => {
  console.log('Database Connected');
})

app.use(express.json());
app.use('/api', reviews)

app.listen(3000, () => {
    console.log(`Server Started at ${PORT}`)
})