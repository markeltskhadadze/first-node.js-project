const {Schema, model } = require('mongoose')

const business = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    address: {
        type: String
    },
    id: {
        type: String
    },
    images: {
        type: String
    },
    instagram: {
        type: String
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    phone_number1: {
        type: String
    },
    phone_number2: {
        type: String
    },
    telegram: {
        type: String
    },
    status: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
})

module.exports = model('Business', business)