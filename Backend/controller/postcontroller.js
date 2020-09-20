const Post = require('../models/postmodel')

exports.getPost = (req, res) => {
   
    Post.find()
        .select('-__v')
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
    var post = new Post(req.body);
        post.save()
        .then(data => {
            res.json({ data })
        })
        .catch(err => {
            res.status(400).json({ error: err })
        })



   
}

