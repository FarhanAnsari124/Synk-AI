const userModel = require("../models/user.model.js")

const bcrypt = require("bcrypt")

const jwt = require("jsonwebtoken")

async function registerUserController(req,res) {
    const {username,email,password} = req.body
    if(!username || !email || !password) {
        return res.status(400).json({message:"All fields are required"})
    }
    const isUserExist = await userModel.findOne({$or:[{username},{email}]})
    if(isUserExist) {
        return res.status(400).json({message:"User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hashedPassword
    })
    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
    })
    return res.status(201).json({message:"User registered successfully"
    })
}
async function loginUserController(req,res) {
    const {email,password} = req.body
    if(!email || !password) {
        return res.status(400).json({message:"All fields are required"})
    }
    const user = await userModel.findOne({email})
    if(!user) {
        return res.status(400).json({message:"Invalid credentials"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        return res.status(400).json({message:"Invalid credentials"})
    }
    const token = jwt.sign({id:user._id,username:user.username},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
    })
    return res.status(200).json({message:"User logged in successfully",user:{
        id:user._id,
        username:user.username,
        email:user.email
    }
    })
}



module.exports = {
    registerUserController,
    loginUserController
}