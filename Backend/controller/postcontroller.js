const Post = require('../models/postmodel')
const formidable = require('formidable');
const fs = require('fs');
const _ = require ('lodash')

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id name email")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(400).json({
                    error: err
                })
            }

            req.post = post; // we added the post info to the req
            next();

        })

}

exports.getPost = (req, res) => {

    Post.find()
        .populate("postedBy", "_id name email")
        .select('_id title body')
        .then(data => {
            res.json({ data })
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
};

exports.createPost = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be upload"
            })
        }
        let post = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = files.photo.type
        }
        post.save()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    })
}

exports.postByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name email")
        .sort("-created")
        .exec((err, posts) => {
            if (err) {

                return res.json({ error: err })
            }
            res.json(posts)
        })
}

exports.isPoster = (req ,res, next)=>{
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if(!isPoster){
        return res.status(403).json({error : "You Are not Autharized"})
    }
    next();
}


exports.updatepost = (req,res)=>{
console.log("ppppppost update")
    let posts = req.post;

    posts = _.extend(posts,req.body);
    
    posts.updated = Date.now();
    posts.save(err => {
        if(err){
            return res.status(400).json({error:err})
        }   
    
        res.json(posts);


        
    })
    next()

}

exports.deletePost = (req, res)=>{
    post = req.post ; 
    post.remove((err,post)=>{
        if (err) {

            return res.json({ error: err })
        }
        res.json( " Deleted Done !")
    })
}
