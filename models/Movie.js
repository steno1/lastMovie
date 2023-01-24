const mongoose=require("mongoose");
// user schema
const MovieSchema=new mongoose.Schema({
    //movie properties
  title:{type:String,required:true,unique:true },/* 
  all movies will have a title and no two movies will have one title */
  desc:{type:String},
  img:{type:String},
  imgTitle:{type:String},
  imgSm:{type:String},
  trailer:{ type:String },
  video:{type:String},
  year:{ type:String},
  limit:{ type:Number},
  genre:{ type:String},
  isSeries:{type:Boolean, default:false,}/* 
  it can be either a movie or series*/

},{timestamps:true});

module.exports=mongoose.model("Movie", MovieSchema)/* 
User is model name. UserSchema is reference point*/
