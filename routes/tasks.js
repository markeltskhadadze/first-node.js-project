const express = require('express')
const router = express.Router()
const Tasks = require('../models/tasks')
const auth = require('../middleware/auth')
const Users = require("../models/users")
const Business = require("../models/business")
const Events = require("../models/events")
const Reviews = require("../models/reviews");

router.get('/tasks', auth, async (req, res) => {
    const currentUser = req.user.user_id
    try{
        const data = await Tasks.find({ user: currentUser })
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

router.post('/tasks', auth, async (req, res) => {
    try {
        const [currentUser, currentBusinessId, currentEventId] = await Promise.all([
            Users.findById(req.user.user_id),
            Business.findById(req.body.business),
            Events.findById(req.body.event)
        ])

        const { name, date_time, description, is_done } = req.body
        const data = new Tasks({
            event: currentEventId,
            name,
            date_time,
            description,
            business: currentBusinessId,
            user: currentUser,
            is_done
        })
        await data.save()
        res.status(200).send(data)
    } catch (e) {
        console.log(e)
        res.status(500).send("Failed to add task")
    }
})

router.put('/tasks/:id', auth,  async (req, res) => {
    try {
        const data = await Tasks.findByIdAndUpdate(req.params.id, req.body)
        res.json(data)
        res.status(200).send("Task updated successfully")
    } catch (e) {
        console.log(e)
        res.status(500).send("Failed to update task")
    }
})

module.exports = router