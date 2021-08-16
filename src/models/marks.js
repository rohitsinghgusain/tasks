const mongoose = require('mongoose');
const userModel = require('./userModel');

const marksSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.ObjectId,
        ref: userModel
    },
    attempt_round: {
        type:String,
        enum: ['First', 'Second','Third'],
        default: null
    },
    marks: {
        type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const Marks = new mongoose.model("Mark", marksSchema);
module.exports = Marks;