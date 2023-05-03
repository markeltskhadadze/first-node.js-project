const express = require('express')
const router = express.Router()
const Users = require('../models/users');

router.get('/users', async (req, res) => {
  try{
    const data = await Users.find();
    res.json(data)
  }
  catch(error){
    res.status(500).json({message: error.message})
  }
})

router.post('/add-user', async (req, res) => {
  const data = new Users(req.body)
  try {
    await data.save()
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

router.post('/remove', async (req, res) => {
  try {
    await Users.deleteOne({_id: req.body._id})
  } catch (e) {
    console.log(e)
  }
})

module.exports = router