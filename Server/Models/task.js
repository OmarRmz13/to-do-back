const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let taskSchema = new Schema({
    task: {
        type: String,
        required: [true, 'Task name is required']
    },
    endDate: {
        type: Date,
        required: [true, 'endDate is required']
    },
    endTime: {
        type: String,
        required: [true,'endTime is required']
    },
    complete: {
        type:Boolean,
        default:false
    }
});

taskSchema.plugin(uniqueValidator,{
    message: 'It must be unique and different'
});

module.exports = mongoose.model('Task', taskSchema);