const _ = require('lodash')
const User = require('../models/userModel')
const formidable = require('formidable');
const fs = require('fs');


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

exports.hasAuthorization = (req, res, next) => {

    const authoruzed = req.profile && req.auth && req.auth._id == req.profile._id;
    if (!authoruzed) {
        return res.status(403).json({
            error: "Un authorized!"
        })
    }
    next();
}

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
    return res.json(req.profile);
}


exports.userPhoto = (req, res, next)=>{
    if(req.profile.photo.data){
        res.set("Content-Type",req.profile.photo.type)
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