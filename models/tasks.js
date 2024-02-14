const {Schema, model } = require('mongoose')

const tasks = new Schema({
    event: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    date_time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    business: {
        type: Schema.Types.ObjectId,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    is_done: {
        type: Boolean,
        required: true
    },
})

module.exports = model('Tasks', tasks)