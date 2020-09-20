const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
require('dotenv').config();
const User = require('../models/userModel')

exports.signup = async (req,res)=>{

    const exist = await User.findOne({email : req.body.email});
    if(exist) {
        res.status(403).json({
            error: "Email is taken"
        })
    }
    const user = new User(req.body);
    await user.save();
    res.json({message : "Signup Success, please Login"});
        
}

exports.signin = (req,res)=>{
    //find the user is exist or not
    const {email , password} = req.body;
    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(401).json({error: "the email is not exist please Signup"})
            
        }
        // make sure that password and email is right
        if(!user.authenticate(password)){
            return res.status(401).json({error: "the Password is incorrect"})
            
        }

        // generate token
       
        console.log('user._id  ', user._id);
        const token = jwt.sign({_id:user._id},process.env.JWT_SECRET);
        
        res.cookie("t",token,{expire:new Date()+9999})     

        const {_id,email,name}= user;
        return res.json({token , user : {_id,email,name}})



    })
}

exports.signout = (req,res)=>{
    res.clearCookie("t");
    return res.json("Signout Success ")

}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,  algorithms: ['HS256'],
    userProperty: 'auth' 
});


