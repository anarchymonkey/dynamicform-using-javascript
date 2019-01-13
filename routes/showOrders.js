let express = require('express'),
    app = express.Router();

app.get('/cart',(req,res)=>{
    res.render('showorders');
});

 module.exports = app;