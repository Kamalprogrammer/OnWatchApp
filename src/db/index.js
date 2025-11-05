// import mongoose from "mongoose";
// import dotenv from 'dotenv'
// dotenv.config()
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI);
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(" MongoDB Connection Failed:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;


import mongoose from "mongoose";
import dotenv from "dotenv";
import { DB_NAME } from "../constants.js";
dotenv.config({ path: "./.env" });
console.log("Mongo URI db file:", process.env.MONGODB_URI);
const connectDB = async () => {
  try {
    // const connectionInstance = await mongoose.connect
      // (`${process.env.MONGODB_URI}/${DB_NAME}`)
      const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)



    // console.log(connectionInstance)
    // connection.host: iska use production ke 
    // time par kis server se connect ho rhe uska 
    // pta karne ke liye karte hei 
  } catch (err) {
    console.log("MONGODB connection Faild ", err);
    process.exit(1) //this is methode learn more about it 
  }
}


export default connectDB
