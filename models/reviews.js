const {Schema, model} = require('mongoose')

const reviews = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  reviewText: {
    type: String,
    required: true,
  }
})

module.exports = model('Reviews', reviews)