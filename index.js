const express = require('express')
const reviews = require('./routes/reviews')
const services = require('./routes/services')
const users = require('./routes/users')
const posts = require('./routes/posts')
const projects = require('./routes/project-info')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const Grid = require("gridfs-stream")
const nodemailer = require('nodemailer')

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

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'markeltskhadadze@gmail.com',
        pass: 'faythjehbhbfrldq'
    }
})

app.post('/api/send-phone', async (req, res) => {
    const phoneNumber = req.body

    const mailOptions = {
        from: 'markeltskhadadze@gmail.com',
        to: 'kuzmichoy36@gmail.com',
        subject: 'New',
        text: `Client number: ${phoneNumber}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Phone number sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'An error occurred while sending email' });
    }
})

app.use(cors())
app.use(express.json())
app.use('/api', reviews)
app.use('/api', users)
app.use('/api', posts)
app.use('/api', services)
app.use('/api', projects)

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})