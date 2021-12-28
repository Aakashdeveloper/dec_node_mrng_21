var express = require('express')
var redis = require('redis');
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";
var app = express();
var port = 3214;

const client = redis.createClient({
    host:'localhost',
    port:6379
})

app.get('/data',(req,res) => {
    const userInput = (req.query.color).trim()
    // check data in redis
    client.get(`${userInput}`,(err,result) => {
        //return from redis
        if(result){
            const output = JSON.parse(result);
            res.send(output)
        }else{
            //get data from mongodb
            mongodb.connect(url,(err,dc) => {
                if(err){
                    res.send("Error while connecting")
                }else{
                    var dbObj = dc.db('decnode');
                    dbObj.collection('products').find({'Color':userInput}).toArray((err,data)=>{
                        if(err){
                            res.status(501).send('Error While Fetching')
                        }else{
                            // save data in redis
                            client.setex(`${userInput}`,3600,JSON.stringify({Source:'Redis',data}))
                            /// first time return from db
                            res.send({Source:'MongoDb',data})
                        }
                    })
                }
            })
        }
    })
})


app.listen(port,(err) => {
    console.log(`Server is running at ${port}`)
})