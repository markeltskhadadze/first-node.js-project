const express = require('express')
const router = express.Router()
const ProjectInfo = require('../models/project-info')
router.get('/project-info', async (req, res) => {
    try{
        const data = await ProjectInfo.find()
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router