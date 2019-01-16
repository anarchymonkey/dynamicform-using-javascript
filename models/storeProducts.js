let mongoose = require('mongoose')
    mongoose.connect("mongodb://localhost/anikets_cart",{useNewUrlParser : true});
    let dbSchema = new mongoose.Schema({
    name : String,
    price : String,
    quantity : String , 
        gst : String,
    productId : String,
    desc : String
});
let dbModel = mongoose.model('anikets_cart',dbSchema);

module.exports = dbModel;