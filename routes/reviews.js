const {Router} = require('express')
const Reviews = require('../models/reviews')
const router = Router()

router.get('/', async function(req, res) {
  const reviews = await Reviews.find()
})

router.post('/add', async (req, res) => {
  const reviews = new Reviews({
    fullName: req.body.fullName,
    reviewText: req.body.reviewText
  })

  try {
    await course.save()
    res.redirect('/courses')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router