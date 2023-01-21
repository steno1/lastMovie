const mongoose=require("mongoose");
// user schema
const MovieSchema=new mongoose.Schema({
  title:{type:String,required:true,unique:true },
  desc:{type:String},
  img:{type:String},
  imgTitle:{type:String},
  imgSm:{type:String},
  trailer:{ type:String },
  video:{type:String},
  year:{ type:String},
  limit:{ type:Number},
  genre:{ type:String},
  isSeries:{type:Boolean, default:false,}

},{timestamps:true});

model.export=mongoose.model("Movie", MovieSchema)/* 
User is model name. UserSchema is reference point*/
