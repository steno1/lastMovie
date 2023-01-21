const router=require("express").Router();
const User=require("../models/User.js");
const CryptoJS = require("crypto-js");
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
        res.status(200).json(user);
    }catch(error){
res.status(500).json(error)
    }
    
  
});

//login
 router.post("/login", async (req, res)=>{
    try{
//find user
const user= await User.findOne({ email:req.body.email});
!user && res.status(401).json("wrong password or username");

// Decrypt
const bytes  = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

originalPassword !== req.body.password &&
res.status(401).json("wrong password or username");
 const {password, ...info}=user._doc;
//if the password are equal
 return res.status(200).json(user);

    }catch(err){
       return res.status(500).json(err)
    }
}) 
module.exports=router;