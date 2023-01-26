const express=require("express");
const app=express();
const mongoose=require("mongoose");
//go and create mongo db cluster
const dotenv=require("dotenv");
const authRoute=require("./routes/auth.js")
const userRoute=require("./routes/User.js")
const movieRoute=require("./routes/Movies.js")
const listRoute=require("./routes/List.js")
dotenv.config();//.env configuration

//moogoosedb connection

  mongoose.connect(process.env.Mongo_url).then(()=>
 console.log("mongo db is connect")
    
  ).catch((error)=>
        console.log(error))

        app.use(express.json());//accept express and json files

     
    app.use("/api/auth", authRoute);//make a request, take the end point
    //api/auth and it belong to the route of authRoute    
    app.use("/api/users", userRoute);//users endpoint
    app.use("/api/movie", movieRoute);//movie endpoint
    app.use("/api/list", listRoute)

app.listen(3000, ()=>{
    console.log("app is listening to port 3000")
})