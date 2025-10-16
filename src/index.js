// require('dotenv').config({path:'./env'}) require ko solve krne ke liye 
import dotenv from "dotenv"
import connectDB from "./db/index.js"


dotenv.config({ 
    path: "./.env" 
})


connectDB()


















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