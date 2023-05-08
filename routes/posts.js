const express = require('express')
const router = express.Router()
const Posts = require('../models/posts')
const Users = require('../models/users')
const auth = require('../middleware/auth')

router.get('/posts', async (req, res) => {
  try{
      const data = await Posts.find().populate('author')
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/add-post', auth, async (req, res) => {
  const user = await Users.findById(req.user.user_id)
  const post = new Posts({
    title: req.body.title,
    description: req.body.description,
    author: user
  })
  user.posts.push(post)
  try {
    await post.save()
    await user.save()
  } catch (e) {
    console.log(e)
  }
})

module.exports = router