const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 7623;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = process.env.MongoUrlLive;

let db;
let col_name = "decUser"

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// health check
app.get('/',(req,res) => {
    res.status(200).send('Health Ok');
});

app.get('/health',(req,res) => {
    res.status(200).send('Health Ok');
});

//Read
app.get('/users',(req,res) => {
    var query = {}
    if(req.query.city && req.query.role){
        query={city:req.query.city,role:req.query.role}
    }
    else if(req.query.city){
        query={city:req.query.city}
    }
    else if(req.query.role){
        query={role:req.query.role}
    }
    else if(req.query.isActive){
        let isActive = req.query.isActive;
        if(isActive == "false"){
            isActive = false
        }else{
            isActive = true
        }
        // query = {isActive:isActive}
        query = {isActive}
    }
    else{
        query={isActive:true}
    }
    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result);
    });
});

//find particular user
app.get('/user/:id',(req,res) => {
    var id = mongo.ObjectId(req.params.id);
    db.collection(col_name).find({_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result);
    });
})

//Add user > POST
app.post('/addUser',(req,res) => {
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result) => {
        if(err) throw err;
        res.status(200).send('User Added');
    })
})




//DB COnnection
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.error(`Error While connecting ${err}`)
    db = client.db('decnode');
    app.listen(port, (err) => {
        console.error(`Server is running on port ${port}`)
    })
})