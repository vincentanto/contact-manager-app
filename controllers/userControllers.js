const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const registerUser = asyncHandler(async(req,res)=>{
    const {username,email,password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailabe = await User.findOne({email});
    if(userAvailabe){
        res.status(400);
        throw new Error("user already registered!")
    }
    const hashedPassword = await bcrypt.hash(password,10);
    console.log(hashedPassword);
    const  user= await User.create({
        username,
        email,
        password : hashedPassword
    })
    console.log(`user created ! ${user}`);
    if(user){
        res.status(201).json({__id:user.id,emal:user.email});

    }
    else{
        res.status(400);
        throw new Error("user not valid");
    }

    res.json({message:"Registration Sucess"})
});


const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user&& await bcrypt.compare(password,user.password) ){
        const acessToken = jwt.sign({
            user:{
                username : user.username,
                email:user.email,
                id: user.id,
            }}
            ,process.env.ACCESS_SECRET_TOKEN,{
                expiresIn:"1m"
            }
        )
        res.status(200).json({acessToken})
    }
    else{
        res.status(401);
        throw new Error("Email or password doesn't match!");
    }
res.json({message:"login successfull"})
});

const currentUser = asyncHandler(async (req,res)=>{
    res.json({
        message:"Current user Details"
    })
});

module.exports={registerUser,loginUser,currentUser};