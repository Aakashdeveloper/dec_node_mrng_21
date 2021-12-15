var express = require('express');
var restaurantsRouter = express.Router();

var restaurants = [
    {
        "id":1,
        "category": "Fashion",
        "thumb":"https://i.ibb.co/56VP0Fn/cloths.jpg"
    },
    {
        "id":2,
        "category":"Electronics",
        "thumb":"https://i.ibb.co/pw5Wtdx/appliances.jpg"
    },
    {
        "id":3,
        "category":"Essentials",
        "thumb":"https://i.ibb.co/0cw34xm/essentials.jpg"
    },
    {
        "id":4,
        "category": "Footwear",
        "thumb":"https://i.ibb.co/r3SZq8S/footware.jpg"
    }
]

restaurantsRouter.route('/')
    .get(function(req,res){
        res.send(restaurants)
    })

    restaurantsRouter.route('/details')
    .get(function(req,res){
        res.send('restaurants Details')
    })

module.exports = restaurantsRouter