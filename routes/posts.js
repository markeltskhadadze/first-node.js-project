const express = require('express')
const router = express.Router()
const Posts = require('../models/posts');

router.get('/posts', async (req, res) => {
  try{
      const data = await Posts.find();
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/add-post', async (req, res) => {
  const data = new Posts(req.body)
  try {
    await data.save() 
  } catch (e) {
    console.log(e)
  }
})

module.exports = router