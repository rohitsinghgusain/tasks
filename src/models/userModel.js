const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique:true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
})

const User = new mongoose.model("User", userSchema);
module.exports = User;