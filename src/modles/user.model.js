import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        userName : {
            type:String, 
            required:true,
            unique: true, 
            lowercase: true,
            trim:true,
            index:true
        }, 
        email:{
            type:String,
            required: true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullName:{
            type:String, 
            required:true,
            trim:true,
            index:true,
        },
        avatar:{
            type:String,//cloudnary url ()
            required: true,

        },

        // this is depedent onvideo schema
        coverimage:{
            type:String, //cloudinary url 
             },
        watchHistory:[{
            type:Schema.Types.ObjectId,
            ref:"Video"
        }]  ,
        password:{
            type:String,
            required:[true,"Password is Required"]
        }  ,
        refreshToken:{
            type:String
        }
},{
    timestamps:true
}
)
// ye ek middle ware hota hei 
// using mongoose hook before saving the data like encrpyting the data 
//yahaan par callback mei function regular nahi dete kyoki ise context pata nahi hota hei 
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next()
        // yadi passowrd modified nahi huaa hei to ise excrpt mt karo 

    this.password = bcrypt.hash(this.password,10)
    // yahaan par encription hona jismei this.password ko 10 rounded ya salt mei encript krte hei 
    next()
})

// to check passwords from use with comparioon of encripted password 
userSchema.methods.isPasswordCorrect = async function(password){
  await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        // this is payload 
        _id:this._id,
        email:this.email,
        userName:this.userName,
        fullName:this.fullName
    },
    // access token
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    }
    )
}


userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        // this is payload 
        _id:this._id,
        
    },
    // access token
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    }
    )
}

export const User = mongoose.model("User",userSchema)

