const express = require('express')
const router = express.Router()
const Reviews = require('../models/reviews')
const auth = require("../middleware/auth")
const Users = require("../models/users")
const Business = require('../models/business')

router.get('/reviews/:id', async (req, res) => {
    const businessId = req.params.id
    try{
      const data = await Reviews.find({ business: businessId })
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/add-reviews', auth, async (req, res) => {
    const currentUser = await Users.findById(req.user.user_id)
    const currentBusinessId = await Business.findById(req.body.businessId)
    const { assigned_rating, created_at, text } = req.body
    const data = new Reviews({
        assigned_rating,
        created_at,
        text,
        user: currentUser,
        business: currentBusinessId
    })
    try {
        await data.save()
    } catch (e) {
        console.log(e)
    }
})

router.put('/review/:id', auth,  async (req, res) => {
    try {
        await Reviews.findByIdAndUpdate(req.params.id, req.body)
    } catch (e) {
        console.log(e)
    }
})

router.delete('/review/:id', auth,  async (req, res) => {
    try {
        await Reviews.deleteOne({_id: req.params.id})
    } catch (e) {
        console.log(e)
    }
})

module.exports = router