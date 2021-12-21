var express = require('express');
var productRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = process.env.mongoUrl

function router(menu){
    productRouter.route('/')
    .get(function(req,res){
        mongodb.connect(url,function(err,dc){
            if(err){
                res.status(501).send('Error While Connecting')
            }else{
                var dbObj = dc.db('decnode');
                dbObj.collection('products').find().toArray(function(err,response){
                    if(err){
                        res.status(501).send('Error While fetching')
                    }else{
                        res.send(response)
                    }
                })
            }
        })
        
    })

    productRouter.route('/category/:id')
        .get(function(req,res){
            //var id = req.params.id;
            var {id} = req.params
            var name = req.query.name;
            console.log(">>>>>",id)
            console.log(">>>>>",name)
            res.render('products',{title:'Products Page',data:products})
        })

    productRouter.route('/details')
        .get(function(req,res){
            res.send('products Details')
        })

    return productRouter
}


module.exports = router