const express = require('express')
const reviews = require('./routes/reviews')
const users = require('./routes/users')
const posts = require('./routes/posts')
const app = express()
const cors = require('cors')
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

app.get('/', (req,res) => {
  res.send({ title: 'Books' });
})

app.use(cors())
app.use(express.json());
app.use('/api', reviews)
app.use('/api', users)
app.use('/api', posts)

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})