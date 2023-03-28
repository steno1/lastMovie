const mongoose=require("mongoose");
const MovieSchema=new mongoose.Schema({
    title:{type:String, required:true, unique:true},
    desc:{type:String},
    imgCoverPage:{type:String},
    imgTitle:{type:String},
    imgSmall:{type:String},
    trailer:{type:String},
    video:{type:String},
    year:{type:String},
    limit:{type:Number},
    genre:{type:String},
    isSeries:{type:Boolean, default:false},
}, {timestamps:true});
module.exports=mongoose.model("Movie", MovieSchema);