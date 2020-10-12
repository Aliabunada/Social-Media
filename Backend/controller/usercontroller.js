const _ = require('lodash')
const User = require('../models/userModel')
const formidable = require('formidable');
const fs = require('fs');

// middleware param 
exports.userById = (req, res, next, id) => {
    User.findById(id)
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, data) => {
            if (err || !data) {

                return res.status(400).json({
                    error: "User Not Found !"
                })
            }

            req.profile = data; // we added the data info to the req
            next();
        })

}

exports.hasAuthorization = (req, res, next) => {

    const authoruzed = req.profile && req.auth && req.auth._id == req.profile._id;
    if (!authoruzed) {
        return res.status(403).json({
            error: "Un authorized!"
        })
    }
    next();
}

// findPeople
exports.findPeople = (req, res, next) => {
    let following = req.profile.following;
    following.push(req.profile._id)
    User.find({ _id: { $nin: following } }, (err, users) => {
        if (err) {
            return res.status(400).json({ error: err })
        }
        return res.json(users)
    }).select("name")
}

// CRUD for USER
exports.allUser = (req, res) => {

    User.find((err, users) => {
        if (err || !users) {
            return res.status(400).json({ error: err })

        }
        res.json(users)
    }).select("email name updated created")


}

exports.getUser = (req, res) => {

    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    console.log(req.profile, ' data bygetuser')
    return res.json(req.profile);
}


exports.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.type)
        return res.send(req.profile.photo.data)
    }
    next();
}

exports.updateUser = (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: 'Image Could not be uploaded' })
        }
        let user = req.profile;
        user = _.extend(user, fields)
        user.updated = Date.now();

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type
        }
        user.save((err, result) => {
            if (err) {
                return res.status(400).json(err)
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            return res.json(result)

        })

    })
}

exports.deleteUser = (req, res, next) => {

    user = req.profile;
    user.remove((err) => {
        if (err) {
            return res.status(400).json({ error: err })
        }

        res.json(" Deleted Done !")
    })
}


// following and un following

exports.addFollowing = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userid,
        { $push: { following: req.body.followId } },

        (err, result) => {
            if (err) {
                return res.status(400).json(err)
            }
            next();
        })
}

exports.addFollower = (req, res) => {
    User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.body.userid } }
        , { new: true } // we do new becuase mongoose will return old data not updated data
    )
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json(err)
            }
            result.hashed_password = undefined;
            result.salt = undefined
            return res.json(result)
        })
}

exports.removeFollowing = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userid, { $pull: { following: req.body.unfollowId }, }, (err, result) => {
        if (err) {
            return res.status(400).json(err)
        }
        next();
    })
}


exports.removeFollower = (req, res, next) => {
    User.findByIdAndUpdate(req.body.unfollowId,
        { $pull: { followers: req.body.userid } }
        , { new: true } // we do new becuase mongoose will return old data not updated data
    )
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json(err)
            }
            result.hashed_password = undefined;
            result.salt = undefined
            return res.json(result)
        })

}
