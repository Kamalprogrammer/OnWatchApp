import mongoose from "mongoose";
const tweetSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })

const Tweet = Schema.model("Tweet", tweetSchema)