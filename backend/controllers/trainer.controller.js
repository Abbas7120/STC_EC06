const trainermodel=require('../models/Trainer');
const userservice=require('../services/user.service');
const {validationResult}=require('express-validator');
module.exports.registerTrainer=async(req,res,next)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
     return res.status(400).json({errors:errors.array()});
   }
  const {name,email,password}=req.body;
  const isTrainerAlreadyExist = await trainermodel.findOne({
  where: { email: email}
});
   if(isTrainerAlreadyExist ){
      return res.status(400).json({message:" already exist"})
   }
   const hashPassword=await trainermodel.hashPassword(password);
   const user=await userservice.createUser({
    name,
    email
    ,password:hashPassword
   })
   const tokens=user.generateAuthToken();
   res.status(201).json({tokens,user});
}

module.exports.loginTrainer=async(req,res,next)=>{
   const errors=validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
   }
   const {email,password}=req.body;
   const user=await trainermodel.findOne({where: { email: email }});
   if(!user){
    return  res.status(401).json({message:"invalid email and password"});
   }
   const isMatch=await user.comparePassword(password);
   if(!isMatch){
     return res.status(401).json({message:"invalid email and password"})
   }
   const token=user.generateAuthToken();
   res.cookie('token',token);
   res.status(200).json({token,user});
}