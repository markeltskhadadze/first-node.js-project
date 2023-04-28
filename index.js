const express = require('express')
const reviewsRouter = require('./routes/reviews')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')

require('dotenv').config()
const { MONGODB } = process.env

// app.get('/reviews', function(req, res) {

//   db.collection('reviews').find().toArray(function (err, docs) {
//     if(err) {
//       console.log(err)
//       return res.sendStatus(500)
//     }
//       res.send(docs)
//     })
// })  

async function start() {
  try {
    const url = `mongodb+srv://markeltskhadadze:71DutibA@cluster0.7f89tqp.mongodb.net/node-project`
    await mongoose.connect(url)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()