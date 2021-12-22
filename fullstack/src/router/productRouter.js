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
                        res.render('products',{title:'Products Page',data:response,menu:menu})
                    }
                })
            }
        })
        
    })

    productRouter.route('/category/:id')
        .get(function(req,res){
            //var id = req.params.id;
            var {id} = req.params
            console.log(">>>>id",id)
            var name = req.query.name;
            mongodb.connect(url,function(err,dc){
                if(err){
                    res.status(501).send('Error While Connecting')
                }else{
                    var dbObj = dc.db('decnode');
                    dbObj.collection('products').find({"category_id":Number(id)}).toArray(function(err,response){
                        if(err){
                            res.status(501).send('Error While fetching')
                        }else{
                            res.render('products',{title:'Products Page',data:response,menu:menu})
                        }
                    })
                }
            })
        })

    productRouter.route('/details/:id')
        .get(function(req,res){
            var {id} = req.params
            console.log(">>>>id",id)
            mongodb.connect(url,function(err,dc){
                if(err){
                    res.status(501).send('Error While Connecting')
                }else{
                    var dbObj = dc.db('decnode');
                    dbObj.collection('products').find({"id":Number(id)}).toArray(function(err,response){
                        if(err){
                            res.status(501).send('Error While fetching')
                        }else{
                            res.render('productDetails',{title:'Products Details Page',data:response,menu:menu})
                        }
                    })
                }
            })
        })

    return productRouter
}


module.exports = router