const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose')

let app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/anikets_cart",{useNewUrlParser : true});
let dbSchema = new mongoose.Schema({

    productName : String,
    productPrice : String,
    productQuantity : String , 
                gst : String,
        productId : String

});
let dbModel = mongoose.model('anikets_cart',dbSchema);

//adding false data
dbModel.create({name : "Aniket"},(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("data added");
    }
});

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/items',(req,res)=>{
    res.render('shoppingCart');
});

app.get('/cart',(req,res)=>{
    res.render('showorders');
});

app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
    console.log("Server has started");
    }
});