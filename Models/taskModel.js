const mongoose = require('mongoose');
const appError = require('../Utils/globalErrorHandler');


const TaskSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        maxLength:[20, 'task name too long']
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
    },
    completed: {
        type: Boolean,
        default: false
    },
    pirorety:{
        type: String,
        default: 'normal',
        enum: ['normal', 'high', 'low']
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User'     
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Category'     
    }
},
{
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
    })



    
    TaskSchema.pre(/^find/, function(next) {
      this.populate({
        path: 'category'
      })
            next()

        })

const Task = mongoose.model('Task', TaskSchema)


module.exports = Task