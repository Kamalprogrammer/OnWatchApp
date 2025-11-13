import mongoose, { Schema } from "mongoose";
import { refreshAccessToken } from "../controllers/user.controller";

const likeSchema = new Schema({
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
    tweet: {
        type: Schema.Types.ObjectId,
        ref: "Tweet"
    },
    likedBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    // ref is comming from Datamodel that we have metioned the name of the feild 
}, { timestamps: true })

export const Like = mongoose.model("Like", likeSchema)