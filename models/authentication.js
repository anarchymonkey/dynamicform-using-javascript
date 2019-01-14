let mongoose = require('mongoose'),
    passport_local_mongoose = require('passport-local-mongoose')

let authSchema = new mongoose.Schema({
    username: String,
    password : String,
    email : String
});

authSchema.plugin(passport_local_mongoose);
var authModel = mongoose.model('auth',authSchema);
module.exports = authModel;