const {Router} = require('express')
const Reviews = require('../models/reviews')
const router = Router()

router.get('/', async (req, res) => {
  try {
    const reviews = await Reviews.findAll()
    res.status(200).json(reviews)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Server error'
    })
  }
})

router.post('/', async (req, res) => {
  console.log(req)
  try {
    const reviews = await Reviews.create({
      fullName: req.body.fullName,
      reviewText: req.body.reviewText
    })
    res.status(201).json({reviews})
  } catch (error) {
    console.log(error)
    // res.status(500).json({
    //   message: 'Server error'
    // })
  }
})

module.exports = router