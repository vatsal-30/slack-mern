import mongoose from "mongoose";

const slackScheme = mongoose.Schema({
    channelName: String,
    conversation: [
        {
            message: String,
            timeStamp: String,
            user: String,
            userImage: String
        }
    ]

})

export default mongoose.model("conversation",slackScheme);