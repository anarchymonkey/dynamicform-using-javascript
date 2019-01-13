const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      Store = require('./models/storeProducts.js'),
      CustomAuth = require('./models/authentication.js')

const  home = require('./routes/index.js'),
       itemList = require('./routes/shoppingCart.js'),
       cart = require('./routes/showOrders.js')
            

let app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(home);
app.use(itemList);
app.use(cart);


app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
    console.log("Server has started");
    }
});