
exports.createPostValidation = (req,res,next)=>{
    //title
    req.check('title', 'Write a title').notEmpty();
    req.check('title', 'Title must be between 4 to 150 characters ').isLength({
        min:4, max : 150
    });


     
     req.check('body', 'Write a body').notEmpty();
     req.check('body', 'Body must be between 4 to 2500 characters ').isLength({
         min:4, max : 2500
     });

     //check the errors
     const errors = req.validationErrors();

     if(errors){
         const firstError = errors.map(err=>err.msg)[0];
         return res.status(400).json({err:firstError});
     }
     next();
    
}
exports.signupUserValidation = (req,res,next)=>{

    // name is not null between 3 - 10 charachter
    req.check("name", 'Name is required').notEmpty();
    
    // email is not null
    // req.check('email', 'Email is required').notEmpty();
    req.check("email", "Email is required")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({  min:4 })

    req.check('password', 'Password is required').notEmpty();
    req.check('password')
    .isLength({  min:6 })
    .withMessage("Password must contain at least 6 characters")
    .matches(/\d/)
    .withMessage("Password must contain a number")

    //check the errors
    const errors = req.validationErrors();

    if(errors){
        const firstError = errors.map(err=>err.msg)[0];
        return res.status(400).json({err:firstError});
    }
    next();
}
