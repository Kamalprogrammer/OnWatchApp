// require('dotenv').config({path:'./env'}) require ko solve krne ke liye 
import dotenv from "dotenv"
import connectDB from "./db/index.js"
// import App from './App.js'
import express from "express"
const app = express()


dotenv.config({ 
    path: "./.env" 
})


connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server is runnig at port : ${process.env.PORT}`)
  });
  //here we can handle server level error using app.on

  app.on("error",(error)=>{
    console.error("Server Error:",error);
  })


})
.catch((err)=>{
  console.log("MongoDB Connection Faild",err)
})


















// traditional Approach to Connect With Database 


// import express from "express"
// const app  = express()

// (async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("err",(error)=>{
//             console.log("ERR:",error);
//             throw error
//         })

//         // listing the Express Server here 
//         app.listen(process.env.PORT,()=>{
//             console.log(`App is Lostening on Port ${process.env.PORT}`);
//         })
//     }catch(err){
//         console.err("ERROR",err)
//         throw err

//     }
// })()