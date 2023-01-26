const router=require("express").Router();
const Movie=require("../models/Movie.js");
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
        try{
//update new movie
const updatedMovie= await Movie.findByIdAndUpdate(req.params.id,
    {$set:req.body}, {new:true});/* new:true is a configuration that returns
    new updated user*/
    return res.status(200).json(updatedMovie)
        }
   
   catch(err){
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

 //Get
router.get("/find/:id", verify, async (req, res)=>{

     try{
 const movie=await Movie.findById(req.params.id);
 return res.status(200).json(movie)
     }catch(err){
         return res.status(500).json(err)
     }
    
 })

 //Get random
router.get("/random", verify, async (req, res)=>{
const type=req.query.type;/* query is used when there are choices in 
an endpoint*/
let movie;//a movie variable
/* N/B $match(aggregation) in mongodb filters the documents to pass only
the documents that match the specified condtions(s) to the next
    pipeline stage.
    it has the following prototype form {$match:{<query>}}. check
    google for details*/
    try{
if(type==="series"){
    /*if type="series", find a random series */
movie= await Movie.aggregate([
    {$match:{isSeries:true}},//find all series
    /*showing one random series */
    {$sample:{size:1}}//then give us just a series sample
])
}else{
    movie= await Movie.aggregate([
        {$match:{isSeries:false}},//find all movies
        /*showing one random movies */
        {$sample:{size:1}}//then give us just a movie sample
    ])
}
/*After finding our sample then return the following statusCode */
return res.status(200).json(movie)
    }catch(err){
        return res.status(500).json(err)
    }
   
})

//get all
router.get("/", verify, async (req, res)=>{
    if(req.user.isAdmin ){
     
     //save inside db
     try{
 const allMovies=await Movie.find();
 return res.status(200).json(allMovies.reverse())
     }catch(err){
         return res.status(500).json(err)
     }
    } else{
     return res.status(403).json("you are not allowed")
    }
 })




module.exports=router