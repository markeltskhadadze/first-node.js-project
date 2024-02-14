const express = require('express')
const router = express.Router()
const Events = require('../models/events')
const auth = require('../middleware/auth')
const Users = require("../models/users");

router.get('/events', auth, async (req, res) => {
    const currentUser = req.user.user_id
    try{
        const data = await Events.find()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/events', auth, async (req, res) => {
    try {
        const [currentUser, currentBusinessId] = await Promise.all([
            Users.findById(req.user.user_id),
        ])

        const { name, date } = req.body
        const data = new Events({
            name,
            date,
            user: currentUser
        })
        await data.save()
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(500).send("Failed to add event")
    }
})

module.exports = router