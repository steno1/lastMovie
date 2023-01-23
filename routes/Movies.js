const router=require("express").Router();
const Movie=require("../models/User.js");
const verify=require("../verifyToken.js")

//routes
//create
router.post("/", verify, async (req, res)=>{
   if(req.user.isAdmin ){
    //create new movie
    const newMovie=new Movie(req.body);
    //save inside db
    try{
const savedMovie= await newMovie.save();
return res.status(200).json(savedMovie)
    }catch(err){
        return res.status(500).json(err)
    }
   } else{
    return res.status(403).json("you are not allowed")
   }
})

//update
router.put("/:id", verify, async (req, res)=>{
    if(req.user.isAdmin ){
     //update new movie
     const updatedMovie= await new Movie.findByIdAndUpdate(req.params.id,
        {$set:req.body}, {new:true});
     //save inside db
     try{
 const savedMovie= await newMovie.save();
 return res.status(200).json(savedMovie)
     }catch(err){
         return res.status(500).json(err)
     }
    } else{
     return res.status(403).json("you are not allowed")
    }
 })

 //Delete
router.delete("/:id", verify, async (req, res)=>{
    if(req.user.isAdmin ){
     
     //save inside db
     try{
 await Movie.findByIdAndDelete(req.params.id);
 return res.status(200).json("The movie has been deleted...")
     }catch(err){
         return res.status(500).json(err)
     }
    } else{
     return res.status(403).json("you are not allowed")
    }
 })

 //get
router.delete("/:id", verify, async (req, res)=>{
     //save inside db
     try{
 const movie=await Movie.findById(req.params.id);
 return res.status(200).json(movie)
     }catch(err){
         return res.status(500).json(err)
     }
    
 })



module.exports=router