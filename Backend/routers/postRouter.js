const express = require ('express');
const router = express.Router();
const {getPost,createPost} = require('../controller/postcontroller')
const {requireSignin} = require('../controller/auth')
const {userById,hasAuthorization} = require('../controller/usercontroller')

const validator = require('../validator/validationfunctions')

router.get('/',getPost)

router.post('/post',requireSignin,validator.createPostValidation,createPost)

router.param('/userId', userById)

module.exports = router;