const express = require('express')
const router = express.Router()
const Reviews = require('../models/reviews')
const auth = require("../middleware/auth")

router.get('/reviews', async (req, res) => {
  try{
      const data = await Reviews.find()
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/add-reviews', async (req, res) => {
  const data = new Reviews(req.body)
  try {
    await data.save()
  } catch (e) {
    console.log(e)
  }
})

router.post('/remove-review', auth,  async (req, res) => {
    try {
        await Reviews.deleteOne({_id: req.body._id})
    } catch (e) {
        console.log(e)
    }
})

module.exports = router