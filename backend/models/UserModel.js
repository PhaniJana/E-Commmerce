import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}},

},{minimize:false}) // we initialized cartData with empty object usually mongo db neglects the empty objects so we used minimize:false

const userModel=mongoose.models.user || mongoose.model('user',UserSchema)

export default userModel;