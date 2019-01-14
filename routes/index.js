let express = require('express'),
    app = express.Router(),
    Store = require('../models/storeProducts.js'),
    middleware = require('../middleware/middleware.js')



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

app.get('/',middleware.checkUserAuth,(req,res)=>{
    Store.find({},(err,storeData)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            console.log(storeData);
            res.render('index',{storeData : storeData});
        }
    });
    
});

module.exports = app;