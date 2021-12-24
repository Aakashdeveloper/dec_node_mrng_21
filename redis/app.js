var express = require('express');
var axios = require('axios');
var redis = require('redis');
var port = process.env.PORT ||1400;
var app = express();

const client = redis.createClient({
    host:'localhost',
    port:6379
});

app.get('/data',(req,res) => {
    const userInput = (req.query.country).trim()
    const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`
    // check in redis first
    console.log(">>>>url",url)
    return client.get(`${userInput}`,function(err,response){
        console.log(">>>>inside>>>>>")
        //if data is in redis
        if(response){
            const output = JSON.parse(response);
            res.send(output)
        }else{
            // as data is not in redis make api call and save in redis
            axios.get(url)
                .then(function(response){
                    // save in redis
                    const output = response.data;
                    console.log(">>>>output",output)
                    client.setex(`${userInput}`,3600, JSON.stringify({source:'Redis Cache',output}))
                    // return response of api first time
                    res.send({source:'Api',output})
                })
        }
    })

})

app.listen(port,(err) => {
    console.log(`Server is running on port ${port}`)
})