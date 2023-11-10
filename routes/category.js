const express = require('express')
const router = express.Router()
const Category = require('../models/category')
router.get('/category', async (req, res) => {
    try{
        const data = await Category.find()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router