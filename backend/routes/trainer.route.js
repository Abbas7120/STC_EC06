const express=require('express');
const router=express.Router();
const {body}=require('express-validator');
const trainercontroller=require('../controllers/trainer.controller')
router.post('/register',
    //array of middleware function 
    [
    body('email').isEmail().withMessage('Invalid Email'),//speicfy validation rule for field name email from req.body
    body('name').isLength({min:3}).
    withMessage('firstname must be at least 3 character'),
    body('password').isLength({min:6}).withMessage
    ('password must be of at least 6 charcters')
],trainercontroller.registerTrainer);

router.post('/login',
    [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').isLength({min:6}).withMessage
        ('password must be of at least 6 characters')
    ],trainercontroller.loginTrainer
);


module.exports=router;