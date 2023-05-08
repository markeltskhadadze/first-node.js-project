const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

router.get('/users', auth, async (req, res) => {
  try{
    const data = await Users.find()
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

router.post('/add-user', auth, async (req, res) => {
  const data = new Users(req.body)
  try {
    await data.save()
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.post('/login', async (req, res) => {
  const name = req.body.name
  const password = req.body.password
  try {    
    if (!(name && password)) {
      res.status(400).json("All input is required")
    }
    const user = await Users.findOne({ name })

    if (user) {
      const token = jwt.sign(
        { user_id: user._id, name },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token
      
      res.status(200).json(user)
    }
    res.status(400).send("Invalid Credentials")
  } catch (err) {
    console.log(err)
  }
});

router.post('/remove', auth,  async (req, res) => {
  try {
    await Users.deleteOne({_id: req.body._id})
  } catch (e) {
    console.log(e)
  }
})

router.get('/profile', auth, async (req, res) => {
  try {
    const data = await Users.findById(req.user.user_id)
    res.json(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router