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
const swaggerUi = require('swagger-ui-express');
const package = require('./package.json');
const swaggerDocument = require('./swagger.json');

swaggerDocument.info.version = package.version;
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

let db;
let col_name = "decUser"

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// health check
app.get('/',(req,res) => {
    res.render('index');
});

app.get('/health',(req,res) => {
    res.status(200).send('Health Ok');
});

//Read
app.get('/users',(req,res) => {
    var query = {}
    if(req.query.city && req.query.role){
        query={city:req.query.city,role:req.query.role,isActive:true}
    }
    else if(req.query.city){
        query={city:req.query.city,isActive:true}
    }
    else if(req.query.role){
        query={role:req.query.role,isActive:true}
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

// update the user > put/patch
app.put('/updateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                role:req.body.role,
                isActive:true
            }
        },(err,result) =>{
            if(err) throw err;
            res.status(200).send('Data Updated')
        }
    )
})

// hard delete
app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).remove(
        {_id:mongo.ObjectId(req.body._id)},(err,result) => {
            if(err) throw err;
            res.send('User Removed')
        }
    )
})


// soft delete (deactivate)
app.put('/deactivateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        },(err,result) =>{
            if(err) throw err;
            res.status(200).send('User Deactivate')
        }
    )
})

// Activate
app.put('/activateUser',(req,res) => {
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        },(err,result) =>{
            if(err) throw err;
            res.status(200).send('User Activate')
        }
    )
})


//DB COnnection
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.error(`Error While connecting ${err}`)
    db = client.db('decnode');
    app.listen(port, (err) => {
        console.error(`Server is running on port ${port}`)
    })
})