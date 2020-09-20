const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;
var postSchema = mongoose.Schema({
    
    title:
    {
        type : String,
        required : 'Title is Required',
    },

    body:
    {
        type : String,
        required : 'Body is Required',
    },

   
})

module.exports = mongoose.model('Post',postSchema);