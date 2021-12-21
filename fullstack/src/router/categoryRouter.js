var express = require('express');
var categoryRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = process.env.mongoUrl;

function router(menu){

    categoryRouter.route('/')
        .get(function(req,res){
            mongodb.connect(url, function(err,dc){
                if(err){
                    res.status(500).send('Error While Connecting')
                }else{
                    var dbObj = dc.db('decnode');
                    dbObj.collection('category').find().toArray(function(err,response){
                        if(err){
                            res.status(500).send('Error While Fetching Data')
                        }else{
                            res.render('category',{title:'Category Page',data:response,menu})
                        }
                    })
                }
            })
        //res.send(category)
        
    })

    categoryRouter.route('/details')
        .get(function(req,res){
        res.send('category Details')
    })

    return categoryRouter
}


module.exports = router