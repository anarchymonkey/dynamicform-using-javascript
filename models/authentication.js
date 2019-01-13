let mongoose = require('mongoose');

let authSchema = new mongoose.Schema({
    username: String,
    password : String,
    email : String
});

var authModel = mongoose.model('auth',authSchema);
module.exports = authModel;