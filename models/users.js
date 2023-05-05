const {Schema, model} = require('mongoose')

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
  }
})

module.exports = model('Users', users)