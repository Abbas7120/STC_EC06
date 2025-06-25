const express=require('express');
const app=express();
const dotenv=require('dotenv');
const cors=require('cors');
const trainerRoutes=require('./routes/trainer.route');
const traineeRoutes=require('./routes/trainee');
const cookieparser=require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
dotenv.config();
app.use(cors());
app.use(cookieparser());
app.use('/trainer',trainerRoutes);
app.get('/',(req,res)=>{
    res.send("backend is working");
})
module.exports=app; 