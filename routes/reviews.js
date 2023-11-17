const express = require('express')
const router = express.Router()
const Reviews = require('../models/reviews')
const auth = require("../middleware/auth")
const Users = require("../models/users")
const Business = require('../models/business')

router.get('/reviews', auth, async (req, res) => {
    const currentUser = req.user.user_id
    try{
        const data = await Reviews.find({ user: currentUser }).populate('business')
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})
router.get('/reviews/:id', async (req, res) => {
    const businessId = req.params.id
    try{
      const data = await Reviews.find({ business: businessId }).populate('user')
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/add-reviews', auth, async (req, res) => {
    try {
        const [currentUser, currentBusinessId] = await Promise.all([
            Users.findById(req.user.user_id),
            Business.findById(req.body.businessId)
        ])

        const { assigned_rating, created_at, text } = req.body
        const data = new Reviews({
            assigned_rating,
            created_at,
            text,
            user: currentUser,
            business: currentBusinessId
        })
        await data.save()
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(500).send("Failed to add review")
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
        res.status(200).send("Review deleted successfully")
    } catch (e) {
        console.log(e)
        res.status(500).send("Failed to delete review")
    }
})

module.exports = router