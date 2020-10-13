const Post = require('../models/postmodel')
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const { findByIdAndUpdate } = require('../models/postmodel');

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
        .select('_id title body created like')
        .sort({ created: -1 })
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.json({
                error: err
            })
        })
};


exports.getSinglePost = (req, res) => {
    return res.json(req.post);
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
        .select('_id title body created like')
        .sort("-created")
        .exec((err, posts) => {
            if (err) {

                return res.json({ error: err })
            }
            res.json(posts)
        })
}

exports.isPoster = (req, res, next) => {
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    if (!isPoster) {
        return res.status(403).json({ error: "You Are not Autharized" })
    }
    next();
}


exports.updatepost = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Image Could not be uploaded' })
        }
        let post = req.post;
        post = _.extend(post, fields)
        post.updated = Date.now();

        if (files.photo) {
            post.photo.data = fs.readFileSync(files.photo.path);
            post.photo.contentType = files.photo.type
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json(err)
            }
            return res.json(result)

        })

    })


}

exports.deletePost = (req, res) => {
    post = req.post;
    post.remove((err, post) => {
        if (err) {

            return res.json({ error: err })
        }
        res.json(" Deleted Done !")
    })
}

exports.postPhoto = (req, res, next) => {
    if (req.post.photo.data) {
        res.set("Content-Type", req.post.photo.type)
        return res.send(req.post.photo.data)
    }
    next();
}


exports.like = (req, res) => {
    findByIdAndUpdate(req.body.postId, { $push: { like: req.body.userId }},{new:true})
    .exec((error,result)=>{
        if(error){
            return res.status(400).json({error:error})
        }
        return res.json(result)
    })

}

exports.unlike = (req, res) => {
    findByIdAndUpdate(req.body.postId, { $pull: { like: req.body.userId }},{new:true})
    .exec((error,result)=>{
        if(error){
            return res.status(400).json({error:error})
        }
        return res.json(result)
    })
}