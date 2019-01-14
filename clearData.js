let auth = require('./models/authentication.js'),
    store = require('./models/storeProducts.js')


    function removeEverything()
    {
    store.remove({},(err,removed)=>{
        if(err)
        {
            console.log(err);
        }else{
            console.log(removed);
        }
    });

    auth.remove({},(err,removeAuth)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(removeAuth);
        }
    });
    }


    module.exports = removeEverything;