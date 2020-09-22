const express = require('express');
const router = express.Router();
const { getPost,
     createPost,
     postByUser,
     postById,
     isPoster,
     updatepost,
     deletePost
     } = require('../controller/postcontroller')
const { requireSignin } = require('../controller/auth')
const { userById, hasAuthorization } = require('../controller/usercontroller')

const validator = require('../validator/validationfunctions')

router.get('/posts', getPost)


router.post('/post/new/:userId',
    requireSignin,
    createPost,
    validator.createPostValidation
);

router.get('/post/by/:userId',requireSignin,postByUser )
router.delete('/post/:postId',requireSignin,isPoster,deletePost);

router.put('/post/:postId',requireSignin,isPoster,updatepost);

router.param('userId', userById)

router.param('postId', postById)

module.exports = router;