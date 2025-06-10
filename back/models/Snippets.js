const mongoose = require('mongoose');

const snipSchema = new mongoose.Schema({
    user: String,
    groupName: String,
    title: String,
    code: String,
    language:String
});

module.exports = mongoose.model('Snip_model',snipSchema,'Snippets');