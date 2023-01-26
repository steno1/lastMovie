const router=require("express").Router();
const List=require("../models/List.js");
const verify=require("../verifyToken.js")

//routes
//create
router.post("/", verify, async (req, res)=>{
   if(req.user.isAdmin ){
    //create new list
    const newList=new List(req.body);
    //save inside db
    try{
const savedList= await newList.save();
return res.status(201).json(savedList)
    }catch(err){
        return res.status(500).json(err)
    }
   } else{
    return res.status(403).json("you are not allowed")
   }
})


//delete
router.delete("/:id", verify, async (req, res)=>{
    if(req.user.isAdmin ){
     try{
 await List.findByIdAndDelete(req.params.id)
 return res.status(200).json("Movie list has been deleted")
     }catch(err){
         return res.status(500).json(err)
     }
    } else{
     return res.status(403).json("you are not allowed")
    }
 })

 //get
router.get("/",  verify, async (req, res)=>{
   /*get either series or movies, so query is involved 
   also, when you click on either series or movies,
   select genre will come out */
   const typeQuery=req.query.type;//?type=series or movies
   const genreQuery=req.query.genre;/*?genre=comedy or action or
    adventure etc. N/B type and genre are from list Model
    */
   let list=[];//after conditions, push all data into list
   try{
    if(typeQuery){//if click on movies or series
        if(genreQuery){//genre selection buttons will follow up
list=await List.aggregate( [
    /* $sample Randomly selects the specified number 
    of documents from the input documents.*/
    { $sample: { size: 10 } },

    { $match: { type: typeQuery, genre: genreQuery } },
    /*if you click on series or movies, it will check the type, let say
    series and check the genre, let say action and return them  */
] );
        }else{/* if we clicked on series or movies, without clicking on genre,
        it means we are in series or movies home page*/
            list=await List.aggregate( [
                { $sample: { size: 10 } },
                { $match: { type: typeQuery } }
            ] );
        }

    }else{
        /*typeQuery is not clicked it means we are in the home page
        and we can fetch random list. N/B without match, sample 
        is random*/
      list=await List.aggregate( [
         { $sample: { size: 10 } } 
        ] )  
    }
    return res.status(200).json(list)

   }catch(err){
    return res.status(500).json(err)
   }

 })


module.exports=router