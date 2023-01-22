const mongoose=require("mongoose");
// user schema
const UserSchema=new mongoose.Schema({
  username:{type:String,required:true,unique:true},
  email:{type:String,required:true,unique:true},
  password:{type:String, required:true},
  profilePicture:{type:String,default:""},
  isAdmin:{type:Boolean,default:false}
},{timestamps:true});//created and updated timing

module.exports=mongoose.model("User", UserSchema)/* 
User is model name. UserSchema is reference point*/
//note before, model name is "User"
