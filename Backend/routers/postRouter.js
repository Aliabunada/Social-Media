const express = require('express');
const router = express.Router();
const { getPost,
    createPost,
    postByUser,
    postById,
    isPoster,
    updatepost,
    deletePost,
    postPhoto,
    getSinglePost,
    like,
    unlike
} = require('../controller/postcontroller')
const { requireSignin } = require('../controller/auth')
const { userById, hasAuthorization } = require('../controller/usercontroller')
const validator = require('../validator/validationfunctions')



router.put('/post/like', requireSignin, like);

router.put('/post/unlike', requireSignin, unlike);

router.param('userId', userById)
router.param('postId', postById)

router.get('/posts', getPost)

router.get('/post/photo/:postId',postPhoto)


router.post('/post/new/:userId',requireSignin,createPost,validator.createPostValidation);

router.get('/post/by/:userId', requireSignin, postByUser)

router.get('/post/:postId', getSinglePost);

router.delete('/post/:postId', requireSignin, isPoster, deletePost);

router.put('/post/:postId', requireSignin, isPoster, updatepost);



module.exports = router;