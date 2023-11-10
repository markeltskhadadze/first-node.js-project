const {Schema, model } = require('mongoose')

const users = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  token: { 
    type: String 
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Posts',
      required: true
    }
  ],
  business: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Business',
      required: true
    }
  ]
})

module.exports = model('Users', users)