const mongoose = require('mongoose')
const inputSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    MobileNumber: {
        type: String,
        required: true
    }
})
const userModel = mongoose.model("users", inputSchema);
module.exports = userModel