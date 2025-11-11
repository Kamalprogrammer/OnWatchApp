import mongoose, { schema } from "mongoose"

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // one who is subscribing
        refL: "User"
    },
    chennal: {
        type: Schema.Types.ObjectId,
        ref: "User"

    },

}, { Timestapm: true })

export const Subscription = mongoose.model("Subscription", subscriptionSchema)