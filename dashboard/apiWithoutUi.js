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



//DB COnnection
MongoClient.connect(mongoUrl,(err,client) => {
    if(err) console.error(`Error While connecting ${err}`)
    db = client.db('decnode');
    app.listen(port, (err) => {
        console.error(`Server is running on port ${port}`)
    })
})