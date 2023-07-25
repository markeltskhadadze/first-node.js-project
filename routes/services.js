const express = require('express')
const router = express.Router()
const Services = require('../models/services')
router.get('/services', async (req, res) => {
    try{
        const data = await Services.find()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})