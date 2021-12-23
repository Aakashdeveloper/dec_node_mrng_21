var express = require('express')
var request = require('request');
var app = express();
var port = process.env.PORT || 8711;

app.use(express.static(__dirname + '/public'))
app.set('views', './src/views');
app.set('view engine','ejs')

app.get('/weather/:city',function(req,res){
    var city = req.params.city
    var url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;
    // calling api
    request(url,function(err,apiResponse){
        if(err) throw err;
        const output = JSON.parse(apiResponse.body);
        res.render('index',{title:'Weather App', result:output})
    })
})

app.listen(port,function(err){
    if(err) throw err;
    console.log(`Server is running on port ${port}`)
})