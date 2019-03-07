let express = require('express'),
    app = express.Router(),
    CustomAuth = require('../models/authentication.js'),
    passport = require('passport'),
    passportLocal = require('passport-local'),
    middleware = require('../middleware/middleware.js')
    
    /* ================================================ */

         //   SIGNUP ROUTES //

    /* ================================================ */

    // get route for signup
    app.get('/signup',(req,res)=>{
        res.render("signup");
    });

    //post route for signup
    app.post('/signup',(req,res)=>{
         
        // creating object from the extracted values    
        let newUser = new CustomAuth({
            username : req.body.username,
            email : req.body.email
        });
        let password = req.body.password;
        

        /* ENTERING THE USERNAME,PASSWORD,EMAIL INTO DATABASE USING MONGOOSE.CREATE(OBJECT,CALLBACK) */
        CustomAuth.register(newUser,password,(err,registered)=>{
            if(err){
                console.log(err);
                res.redirect('/signup');
            }
            else{
                console.log("user registered");
                passport.authenticate("local")(req,res,()=>{
                res.redirect('/items');
                });
            }
        });
    });

    /* ================================================ */

         //   LOGIN ROUTES //

    /* ================================================ */


    //get route for login
    app.get('/signin',(req,res)=>{
        res.render('login');
    });
    
    //post route for login
    app.post('/signin',passport.authenticate("local",{
        successRedirect : '/items',
        failureRedirect : '/signup' 

    }),(req,res)=>{
        console.log("autenticated");
    });

    /* ================================================ */

         //   LOGOUT ROUTES //

    /* ================================================ */
    app.get('/logout',middleware.checkUserAuth,(req,res)=>{

        req.logout();
        res.redirect('/signin');
    });
    //EXPORTING THE MODULE TO THE APP.JS PAGE
    module.exports = app;