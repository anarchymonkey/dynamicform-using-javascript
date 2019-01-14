let express = require('express'),
    app = express.Router(),
    middleware = require('../middleware/middleware.js')

app.get('/cart',middleware.checkUserAuth,(req,res)=>{
    res.render('showorders');
});

 module.exports = app;