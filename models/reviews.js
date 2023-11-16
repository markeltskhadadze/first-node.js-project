const {Schema, model} = require('mongoose')

const reviews = new Schema({
  assigned_rating: {
    type: String,
    required: true
  },
  created_at: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  business: {
    type: Schema.Types.ObjectId,
    ref: 'Business',
    required: true
  }
})

module.exports = model('Reviews', reviews)