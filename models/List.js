const mongoose=require("mongoose");
const ListSchema=new mongoose.Schema({
    //list properties
    title:{type:String,required:true,unique:true },/* 
    each list must have a name and no two list will have the same name*/
    type:{type:String},//either movies or series
    genre:{ type:String},//movies type
    content:{type:Array} //container with movies or series
    
  
  },{timestamps:true});
  module.exports=mongoose.model("List", ListSchema);
  