const {Schema, model} = require('mongoose')

const reviews = new Schema({
  fullName: {
    type: String,
    required: true,
    allowNull: false
  },
  reviewText: {
    type: String,
    required: true,
    allowNull: false
  }
})

module.exports = model('Reviews', reviews)