const express = require('express');
const app = express();
const port = 8790;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const Pool = require('pg').Pool;
const pool = new Pool({
    user:'',
    host:'127.0.0.1',
    database:'postgres',
    port:5432
})

app.get('/',(req,res) => {
    pool.query('SELECT * From employee',(err, result) => {
        if(err) throw err;
        res.send(result.rows);
    })
})

app.post('/add',(req,res) => {
    let fname = req.body.fname;
    let lname = req.body.lname;
    let admin = req.body.admin;
    pool.query('insert into employee(fname,lname,admin) VALUES ($1,$2,$3)',([fname,lname,admin]),
    (err,result) => {
        if(err) throw err;
        res.send(result.rows);
    })
})


app.listen(port,() => {
    console.log(`Server is listening on ${port}`)
})