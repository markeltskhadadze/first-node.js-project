const express = require('express')
const router = express.Router()
const Posts = require('../models/posts')
const Users = require('../models/users')
const auth = require('../middleware/auth')
const upload = require('../middleware/upload')

router.get('/posts', async (req, res) => {
  try{
      const data = await Posts.find().populate('author')
      res.json(data)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

router.post('/add-post', upload.single("file"), auth, async (req, res) => {
  // const user = await Users.findById(req.user.user_id)
  // const post = new Posts({
  //   title: req.body.title,
  //   description: req.body.description,
  //   author: user
  // })
  // user.posts.push(post)
  // try {
  //   await post.save()
  //   await user.save()
  // } catch (e) {
  //   console.log(e)
  // }
  if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:3003/file/${req.file.filename}`;
    return res.send(imgUrl);
})

module.exports = router