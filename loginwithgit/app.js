const express = require('express');
const app = express();
const superagent = require('superagent');
const request = require('request');
const port = 8700;
const cors = require('cors');
app.use(cors());

app.get('/',(req,res) => {
    res.send('<a href="https://github.com/login/oauth/authorize?client_id=a6127c6a239f05d82b08">Login With Github</a>')
});

app.get('/profile',(req,res) => {
    const code = req.query.code;
    if(!code){
        res.send({
            success: false,
            message:'Error While Login'
        })
    }
    superagent
        .post('https://github.com/login/oauth/access_token')
        .send({
            client_id:'a6127c6a239f05d82b08',
            client_secret:'665a9b1d4a97a228511403866bd5aa4ccfc40970',
            code:code
        })
        .set('Accept','application/json')
        .end((err,result) => {

        })
})


app.listen(port,() => {
    console.log(`Running on port ${port}`)
})