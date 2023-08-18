const {Schema, model } = require('mongoose')

const services = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
})

module.exports = model('Services', services)