const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
var postSchema = mongoose.Schema({
    
    title:
    {
        type : String,
        required : true
    },

    body:
    {
        type : String,
        required : true 
    },
    photo : {
        data : Buffer,
        contentType : String
    },

    postedBy : {
        type : ObjectId,
        ref : 'User'
    },
    updated : Date,
    created : {
        type : Date ,
        default : Date.now
    },
    
    like : [{type : ObjectId,  ref : 'User'}],
   
})

module.exports = mongoose.model('Post',postSchema);