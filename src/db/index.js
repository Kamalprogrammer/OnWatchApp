import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async()=>{
    try{
     const connectionInstance= await mongoose.connect
     (`${process.env.MONGODB_URI}/${DB_NAME}`)
     
        console.log(`\n MOngoDB Connected !! DB HOST : ${connectionInstance.connection.host}`);
        // console.log(connectionInstance)
        // connection.host: iska use production ke 
        // time par kis server se connect ho rhe uska 
        // pta karne ke liye karte hei 
    }catch(err){
        console.log("MONGODB connection Faild ", err);
        process.exit(1) //this is methode learn more about it 
    }
}
 

export default connectDB




