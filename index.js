const express=require("express");
const app=express();
const mongoose=require("mongoose");
//go and create mongo db cluster
const dotenv=require("dotenv");
const authRoute=require("./routes/auth.js")
dotenv.config();//.env configuration

//moogoosedb connection

  mongoose.connect(process.env.Mongo_url).then(()=>
 console.log("mongo db is connect")
    
  ).catch((error)=>
        console.log(error))

        app.use(express.json());//accept express and json files
     
    app.use("/api/auth", authRoute);//make a request, take the end point
    //api/auth and it belong to the route of authRoute    

app.listen(3000, ()=>{
    console.log("app is listening to port 3000")
})