let express = require('express'),
    app = express.Router(),
    middleware = require('../middleware/middleware.js')

app.get('/items',middleware.checkUserAuth,(req,res)=>{
    res.render('shoppingCart');
});

module.exports = app;