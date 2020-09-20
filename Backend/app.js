// dependencies
const express = require ('express');
const morgan = require('morgan');
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
dotenv.config();

//connecting with DB
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('DataBase Connected Successfully ^_^ !!!'))

mongoose.connection.on('error',err=>{
    console.log(`DataBase connection Failed ${err.message}`)
})



//bring routes
const postrouter = require ('./routers/postRouter'); 
const userrouter = require ('./routers/userRouter'); 


// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use('/',postrouter)
app.use('/',userrouter)
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error : "Sorry You are not Authorized"});
    }
  });



const port = 5000
app.listen(port,()=>{
    console.log(`listen on ${port}`)
})