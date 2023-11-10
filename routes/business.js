const express = require('express')
const router = express.Router()
const Business = require('../models/business')
const Users = require('../models/users')
const auth = require('../middleware/auth')

router.get('/business', async (req, res) => {
    try{
        const data = await Business.find()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/add-business', auth, async (req, res) => {
    const currentUser = await Users.findById(req.user.user_id)
    const business = new Business({
        name: req.body.name,
        description: req.body.description,
        author: currentUser,
        price: req.body.price
    })
    currentUser.business.push(business)
    try {
      await business.save()
      await currentUser.save()
    } catch (e) {
      console.log(e)
    }
})

module.exports = router