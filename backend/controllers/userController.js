import userModel from "../models/UserModel.js";
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


//User Login
const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
             throw new Error('All fields are Mandatory')
        }
        const user=await userModel.findOne({email})
        if(!user)  return res.json({success:false,message:'User Not Found'})
         
        const isMatch=await bcrypt.compare(password,user.password)
        if(isMatch){
            const token=createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid Credentials'})
        }
    } catch (error) {
         console.log(error);
        res.json({success:false,message:error.message})
    }
}


//User Register
const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !password || !email){
            throw new Error('All fields are Mandatory')
        }

        const exists=await userModel.findOne({email})
        if(exists){
            return res.json({success:false,message:'User Already Exists'})
        }

        // Checking for valid Mail and Strong Password
        if(!validator.isEmail(email) ) return res.json({success:false,message:'Please Enter Valid Mail'})
        if(password.length<8 ) return res.json({success:false,message:'Please enter Strong password'})
        
        // hashing user password
        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new userModel({
            name,
            email,
            password:hashedPassword
        })
        const  user= await newUser.save() // saving user into db

        const token=createToken(user._id)
        res.json({success:true,token})



    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

//Route for Admin Login
const adminLogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid Credentials'})
        }
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }
}
export {loginUser,registerUser,adminLogin} 