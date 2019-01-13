let express = require('express'),
    app = express.Router();

app.get('/items',(req,res)=>{
    res.render('shoppingCart');
});

module.exports = app;