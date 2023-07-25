const express = require('express')
const reviews = require('./routes/reviews')
const services = require('./routes/services')
const users = require('./routes/users')
const posts = require('./routes/posts')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const Grid = require("gridfs-stream")

let gfs

require('dotenv').config()
const { MONGODB } = process.env

mongoose.connect(MONGODB);
const database = mongoose.connection

database.on('error', (error) => {
  console.log(error)
})

database.once("open", function () {
  gfs = Grid(database.db, mongoose.mongo);
  gfs.collection("photos");
});

app.get('/', (req,res) => {
  res.send({ title: 'Books' });
})

app.use(cors())
app.use(express.json())
app.use('/api', reviews)
app.use('/api', users)
app.use('/api', posts)
// app.use('/api', services)

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})