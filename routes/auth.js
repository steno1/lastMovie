const router=require("express").Router();
const User=require("../models/User.js");
const CryptoJS = require("crypto-js");
const jwt=require("jsonwebtoken")
//Register
//post method, if creating. put if updating, get if fetching data, then
//delete for delete
//creating our user
router.post('/register', async (req, res)=>{
    const newUser=new User({// imported model
username:req.body.username,
email:req.body.email,
password:CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    })
    //sending new user into db
    try{
        const user= await newUser.save();
      return  res.status(200).json(user);
    }catch(err){
return res.status(500).json(err)
    }
    
});

 //login
 router.post("/login", async(req, res)=>{
    try{
const user=await User.findOne({email:req.body.email});
if(!user){//if user doesnt exist
   return res.status(404).json("user does not exist")};
// Decrypt
const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
/* user.password is my hached password in database*/
const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
//if password are not equals
if(originalPassword !==req.body.password) {
    /* if(originalPassword !==req.body.password) 
    means if originalPassword in db is not === to new
    password sent by user */
  return  res.status(404).json("wrong password or username");
} 
//before sending any data, create jwt token
const accessToken=jwt.sign({
    id:user._id,
    isAdmin:user.isAdmin},
    process.env.SECRET_KEY,
    {expiresIn:"5d"})
// if the password are equals
const {password, ...info}=user._doc
return res.status(200).json({...info, accessToken})
    }catch(err){
return res.status(500).json(err)
    }
 })

module.exports=router;