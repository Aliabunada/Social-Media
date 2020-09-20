const _ = require ('lodash')
const User = require('../models/userModel')




exports.userById = (req, res, next, id) => {

    User.findById(id).exec((err, data) => {
        if (err || !data) {
            return res.status(400).json({
                error: "User Not Found !"
            })
        }
            
        req.profile = data; // we added the data info to the req

        next();

    })

}

exports.hasAuthorization = (req,res, next) =>{
   
  const authoruzed = req.profile && req.auth && req.auth._id == req.profile._id;
  if (!authoruzed){
    return res.status(403).json({
        error: "Un authorized!"
    })
  }
next();
}

exports.allUser = (req,res)=>{
    
    User.find((err,users)=>{
        if(err || !users){
            return res.status(400).json({error: err})
               
        }
        res.json({users})
    }).select("email name updated created")

    
}

exports.getUser = (req, res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
}


exports.updateUser = (req,res,next)=>{

    let user = req.profile;
    user = _.extend(user,req.body);
    user.updated = Date.now();
    user.save((err,data)=>{
        if(err){
            return res.status(400).json({error:err})
        }
        data.hashed_password = undefined;
        data.salt = undefined;
        res.json({data});


        next()

    })

}

exports.deleteUser = (req,res,next)=>{

    user = req.profile;
    user.remove((err)=>{
        if(err){
            return res.status(400).json({error : err})
        }
       
        res.json( " Deleted Done !")
    })
}