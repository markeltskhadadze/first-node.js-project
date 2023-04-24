const express = require('express')
// const path = require('path')
const sequelize = require('./utils/database')
const reviewsRouter = require('./routes/reviews')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000

// app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/reviews', reviewsRouter)
app.use(express.json())

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});

async function start() {
  try {
    await sequelize.sync()
    app.listen(PORT)
  } catch (e) {
    console.log(e)
  }
}

start()