const {Schema, model } = require('mongoose')

const projectInfo = new Schema({
    project_name: {
        type: String,
        required: true
    },
    project_link: {
        type: String,
        required: true
    },
    chart_data: {
        type: Object,
        required: true
    }
})

module.exports = model('ProjectInfo', projectInfo)