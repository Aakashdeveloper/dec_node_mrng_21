const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const port = 7623;
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoUrl = "mongodb+srv://local:testuser@cluster0.f8vmc.mongodb.net"

let db;
let col_name = "decUser"

// middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// health check
app.get('/',(req,res) => {
    db.collection(col_name).find({}).toArray((err,result) => {
        if(err) throw err;
        res.status(200).render('index',{data:result})
    })
});

app.get('/health',(req,res) => {
    res.status(200).send('Health Ok');
});

//render Form
app.get('/new',(req,res) => {
    res.render('admin')
})

// static file path
app.use(express.static(__dirname+'/public'));
// html file path
app.set('views','./src/views')
//view engine path
app.set('view engine', 'ejs')

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
    const data = {
        "name":req.body.name,
        "city":req.body.city,
        "phone":req.body.phone,
        "role":req.body.role?req.body.role:'User',
        "isActive":true
    }
    db.collection(col_name).insert(data,(err,result) => {
        if(err) throw err;
        //res.status(200).send('User Added');
        res.redirect('/')
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