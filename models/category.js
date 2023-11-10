const {Schema, model } = require('mongoose')

const category = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = model('Category', category)