const mongoose = require('../models/init')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title:{
        type: String,
        required: [true, "can't be blank"]
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    }
},{
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task