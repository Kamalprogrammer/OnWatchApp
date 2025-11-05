// require('dotenv').config({path:'./env'}) require ko solve krne ke liye 
import dotenv from "dotenv"
dotenv.config({path:'./env'})
import connectDB from "./db/index.js"
// import express from "express"
const app = express()

// import {app} from './app.js'd
console.log("Mongo URI:", process.env.MONGODB_URI);


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
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // // traditional Approach to Connect With Database 
        
        
        // // import express from "express"
        // // const app  = express()
        
        // // (async()=>{
          // //     try{
            // //         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
            // //         app.on("err",(error)=>{
              // //             console.log("ERR:",error);
              // //             throw error
              // //         })
              
              // //         // listing the Express Server here 
              // //         app.listen(process.env.PORT,()=>{
                // //             console.log(`App is Lostening on Port ${process.env.PORT}`);
                // //         })
                // //     }catch(err){
                  // //         console.err("ERROR",err)
                  // //         throw err
                  
                  // //     }
                  // // })()
                  
                  
                  
                  import express from "express";
                  import dotenv from "dotenv";
                  dotenv.config(); // Load .env variables
                  import connectDB from "./db/index.js";
                  
                  import {app} from "./app.js"
                  
                  const app = express();
                  
                  // Middleware
app.use(express.json());

// import userRouter from './routes/user.routes.js'

// routes diclaration 
// app.use("/user",userRouter)
// app.use("/api/v1/users", userRouter)
// Basic route
app.get("/", (req, res) => {
  res.send("Server is running successfully 🚀");
});
// app.post("/api/v1/users", (req, res) => {
//   res.send("Server is running successfully 🚀");
// });


// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
