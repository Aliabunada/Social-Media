const express = require ('express');
const router = express.Router();
const {signup,signin,signout,requireSignin} = require('../controller/auth')
const {userById,allUser,getUser,findPeople,updateUser,hasAuthorization,deleteUser,userPhoto,addFollowing,addFollower,removeFollowing,removeFollower} = require('../controller/usercontroller')
const validator = require('../validator/validationfunctions')

router.post('/signup', validator.signupUserValidation, signup)

router.post('/signin',signin)

router.get('/signout',signout)

router.param('userId', userById)

router.get('/users',allUser)

router.get('/user/:userId',requireSignin,getUser)

router.get('/user/findpeople/:userId',requireSignin,findPeople)

router.get('/user/photo/:userId',userPhoto)

router.put('/user/follow', requireSignin,addFollowing,addFollower)

router.put('/user/unfollow', requireSignin,removeFollowing,removeFollower)

router.put('/user/:userId',requireSignin,hasAuthorization,updateUser) // the User just update own Data @loosh

router.delete('/user/:userId',requireSignin,hasAuthorization,deleteUser) // the User just update own Data @loosh


module.exports = router;