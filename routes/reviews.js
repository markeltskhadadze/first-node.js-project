const express = require('express')
const router = express.Router()
const Reviews = require('../models/reviews');

router.get('/reviews', async (req, res) => {
  try{
      const data = await Reviews.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/add-reviews', (req, res) => {
  const data = new Reviews({
    fullName: req.body.name,
    reviewText: req.body.age
  })
})

module.exports = router