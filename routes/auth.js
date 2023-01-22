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
    password sent to the db */
  return  res.status(404).json("Wrong password or Username");
}else{
// if the password are equals
const {password,username, ...info}=user._doc /* dont return password
because it will be stored in a local storage
i destructured password inside user and grab other info
except the password*/
return res.status(200).json(info) } 
    }catch(err){
return res.status(500).json(err)
    }
 })

module.exports=router;