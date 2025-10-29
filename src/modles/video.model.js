import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary seaayega 
            required: true,

        },
        thumbnail: {
            type: String,//cloudinary url
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration:{
            type:Number,  //duration of video proviede by cloudinary 
            required:true
        },
        views:{
            type:Number,
            default:0
        },
        isPublished:{
            type:Boolean,
            default: true
        },
        owner:{
            type:Schema.Types.ObjectId,
            red:User
        }
    }, { timestamps: true }
)

// exporting mongoose Aggregate  Pipeline 
videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video", videoSchema)