const trainerModel=require('../models/Trainer');
module.exports.createUser=
async({name,email,password})=>{
       if(!name||!email||!password){
          throw new Error('All fields are required');
       }
       const user=trainerModel.create({
        name,
        email,
        password
       })
       return user;
    }