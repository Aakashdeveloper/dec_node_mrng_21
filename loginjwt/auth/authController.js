const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('./userSchema');

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

//get all user
router.get('/users',(req,res) => {
    User.find({},(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//registerUser
router.post('/register',(req,res) => {
    // encrypt password
    let hashpassword = bcrypt.hashSync(req.body.password,8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User',
    },(err,data) => {
        if(err) return res.status(500).send("Error while register");
        res.status(200).send("Registration Successful")
    })
})

//loginUser
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return  res.status(500).send({auth:false,token:'Error While Login'})
        if(!user) return  res.status(200).send({auth:false,token:'No User Found Register First'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passIsValid) return  res.status(200).send({auth:false,token:'Invalid Password'})
            // in case password match generate token
            var token =  jwt.sign({id:user._id}, config.secret, {expiresIn:86400})
            res.status(200).send({auth:true,token:token})

        }
    })
})

///userinfo
router.get('/userinfo',(req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    //verify token
    jwt.verify(token, config.secret, (err,user) => {
        if(err) res.send({auth:false,token:'Invalid Token Provided'})
        User.findById(user.id,(err,result) => {
            res.send(result)
        })
    })
})

//delete user
router.get('/delete',(req,res) => {
    User.remove({},(err,data) => {
        if(err) throw err;
        res.send("User Deleted")
    })
})

module.exports = router
