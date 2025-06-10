const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user: String,
    email : String,
    pass: String
});

module.exports = mongoose.model('User_model',userSchema,'Users');