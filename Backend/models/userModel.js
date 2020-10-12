const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid');
const crypto = require ('crypto')
const {ObjectId} = mongoose.Schema;
var userSchema = mongoose.Schema({
    
    name:{
        type : String,
        trim: true,
        required : true,
       
    },

    email:{
        type : String,
        trim: true,
        required : true,
       
    },
   hashed_password:{
        type : String,
        // required : true,
       
    },
    salt : String ,

    created : {
        type : Date ,
        default : Date.now

    },

    photo : {
        data : Buffer,
        contentType : String
    },
about : {
    type: String,
    trim : true
},
    updated : Date,

    followers : [{type : ObjectId,  ref : 'User'}],

    following : [{type : ObjectId,   ref : 'User'}],

})


// virtual fields 
userSchema.virtual('password')
.set(function(password){
     // create temproray variable called _password
    this._password = password
    
    this.salt = uuidv1() //generate timeStamp, The uuidv1 is Package to give random String
    
    this.hashed_password = this.encryptPassword(password);
   
  
})
.get( function(){
    return this._password;
})

 

userSchema.methods = {
    authenticate: function(passwordText){
        return this.encryptPassword(passwordText) === this.hashed_password; 
    },

    encryptPassword : function(password) {
        try{
        return crypto.createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
        }
        catch(err){
            return"";
        }
    }
    } 

    

module.exports = mongoose.model('User',userSchema);