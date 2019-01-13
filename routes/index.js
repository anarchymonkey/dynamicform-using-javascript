let express = require('express'),
    app = express.Router(),
    Store = require('../models/storeProducts.js')



app.post('/',(req,res)=>{
    
    // Creating form data as an object to enter into database
    var formData = {name : req.body.productname, 
                    price : req.body.productprice, 
                    quantity  : req.body.quantity,
                    gst : req.body.gst,
                    desc : req.body.textArea 
                   };
                    console.log(formData);
        Store.create(formData, (err,insertingData)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log("data Successfully added");
                console.log(insertingData);
                res.redirect("/");
            }
        });
});

app.get('/',(req,res)=>{
    res.render('index');
});

module.exports = app;