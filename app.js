const express = require('express'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose'),
      Store = require('./models/storeProducts.js'),
      CustomAuth = require('./models/authentication.js'),
      expressSession = require('express-session'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      removeEverything = require('./clearData.js'),
      methodOverride = require('method-override');
     // removeEverything();

const  home = require('./routes/index.js'),
       itemList = require('./routes/shoppingCart.js'),
       cart = require('./routes/showOrders.js'),
       authentication = require('./routes/authenticate.js')

let app = express();
app.use(expressSession({
    secret : "Aniket is a nice guy",
    resave : false,
    saveUninitialized:false
}));
passport.use(new LocalStrategy(CustomAuth.authenticate()));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(CustomAuth.serializeUser());
passport.deserializeUser(CustomAuth.deserializeUser());
app.set("view engine","ejs");
app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    next();
});
app.use(home);
app.use(itemList);
app.use(cart);
app.use(authentication);

app.listen(3000,(err)=>{
    if(err)
    {
        console.log(err);
    }
    else{
    console.log("Server has started");
    }
});
