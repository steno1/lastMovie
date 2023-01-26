const router=require("express").Router();
const User=require("../models/User.js");
const CryptoJS=require("crypto-js");
const verify=require("../verifyToken.js")


//routes
//update
router.put("/:id", verify, async (req, res)=>{
   if(req.user.id===req.params.id || req.user.isAdmin ){
    //the user is from verifyToken. was assigned to our credentials
    //if password is changed, then encrypt it.
    if(req.body.password){
       req.body.password=CryptoJS.AES.encrypt
       (req.body.password, process.env.SECRET_KEY).toString(); 
    }
    try{
const updateUser=await User.findByIdAndUpdate(req.params.id,{
    $set:req.body,
},{new:true})/* new:true is a configuration that returns
new updated user*/
return res.status(200).json(updateUser)
    }catch(err){
      return  res.status(500).json(err)
    }
   } else{
    return res.status(403).json("you can update only your account")
   }
})
//delete
router.delete("/:id", verify, async (req, res)=>{
    if(req.user.id===req.params.id || req.user.isAdmin ){
     
     try{
 await User.findByIdAndDelete(req.params.id);
 return res.status(200).json('user has been deleted')
     }catch(err){
       return  res.status(500).json(err)
     }
    } else{
     return res.status(403).json("you can delete only your account")
    }
 })
 //get
 router.get("/find/:id", async (req, res)=>{
    
     
     try{
 const user = await User.findById(req.params.id);
 const {password, ...info} =user._doc;
 return res.status(200).json(info)
     }catch(err){
       return  res.status(500).json(err)
     }
    
 });
 //get all
 router.get("/", verify, async (req, res)=>{
    const query=req.query.new;
    //N/B query is used when you have two options in the endpoints
    if(req.user.isAdmin ){
     
     try{
 const users= query 
 ? await User.find().sort({ _id: -1 }).limit(2)
  : await User.find();
 return res.status(200).json(users)
     }catch(err){
       return  res.status(500).json(err)
     }
    } else{
     return res.status(403).json("you are not allowed to see a whole users")
    }
 })
 //get user stats
 router.get("/stats", async(req, res)=>{
    //user statistics for last year
    const today=new Date();
    const lastYear=today.setFullYear(today.setFullYear()-1);/* 
    this will give a year before */
    const monthsArray=[
"January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"
    ];
    //finding total users per month
    //Aggregate them monthly
    try{
        const data=await User.aggregate([
           {
/* in mongo db, $project is used to pass documents with the requested
fields to the next stage in the pipeline*/            
           $project:{
            month:{$month:"$createdAt"}/* will
            look at each month and return corresponding number */
           } 
           },{
            //grouping the documents
  /* in mongodb, $group is used to group input documents by the specified
  _id expression and for each distinct grouping, outputs a document */          
            $group:{
                _id:"$month",//the month from &project
                total:{$sum:1}//will return total users per month
            }
           }
        ])
        return res.status(200).json(data);

    }catch(err){
return res.status(500).json(err)
    }

    

 })

module.exports=router