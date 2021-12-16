var express = require('express');
var app = express();
var dotenv = require('dotenv');
var fs = require('fs');
dotenv.config()
var port = process.env.PORT || 9700;

var morgan  = require('morgan');

var menu = [
    {link:'/', name:'Home'},
    {link:'/category', name:'Category'},
    {link:'/products', name:'Products'},
    {link:'/restaurants', name:'Restaurants'},
    {link:'/abc', name:'Abc'}
]

var categoryRouter = require('./src/router/categoryRouter')(menu)
var productRouter = require('./src/router/productRouter')
var restaurantsRouter = require('./src/router/restaurantRouter')

// static file path
app.use(express.static(__dirname+'/public'));
// html file path
app.set('views','./src/views')
//view engine path
app.set('view engine', 'ejs')

// for logs
app.use(morgan('short',{stream: fs.createWriteStream('./app.logs')}))



var data = [
    {
        "id":1,
        "name":"Shopping",
        "image":"https://i.ibb.co/56VP0Fn/cloths.jpg",
        "link":"/category"
    },
    {
        "id":2,
        "name":"Restaurants",
        "image":"https://b.zmtcdn.com/data/pictures/chains/3/6303/640252389ddc3f264dd0e9f2741e73cd.jpg",
        "link":"/restaurants"
    }
]

//default Route
app.get('/',function(req,res){
    // res.send('Welcome to app')
    res.render('index',{title:'Home Page',data:data,menu})
})



app.use('/category', categoryRouter)
app.use('/products', productRouter)
app.use('/restaurants', restaurantsRouter)

app.listen(port, function(err){
    if(err) throw err;
    else{
        console.log("Server is running on port "+port)
    }
})