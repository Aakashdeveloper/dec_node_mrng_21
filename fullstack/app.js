var express = require('express');
var app = express();
var dotenv = require('dotenv');
var fs = require('fs');
dotenv.config()
var port = process.env.PORT || 9700;

var morgan  = require('morgan');

var categoryRouter = require('./src/router/categoryRouter')
var productRouter = require('./src/router/productRouter')

// for logs
app.use(morgan('short',{stream: fs.createWriteStream('./app.logs')}))

//default Route
app.get('/',function(req,res){
    res.send('Welcome to app')
})

app.use('/category', categoryRouter)
app.use('/products', productRouter)

app.listen(port, function(err){
    if(err) throw err;
    else{
        console.log("Server is running on port "+port)
    }
})