const ListSchema=new mongoose.Schema({
    //list properties
    title:{type:String,required:true,unique:true },/* 
    each list must have a name and no two list will have the same name*/
    type:{type:String},
    genre:{ type:String},
    content:{type:Array}
    
  
  },{timestamps:true});
  module.exports=mongoose.model("List", ListSchema);
  