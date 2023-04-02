import mongoose from "mongoose";


const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true });


const chatSchema = mongoose.Schema({
    personOne: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    personTwo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    messages: [messageSchema]
});


const Chat = mongoose.model("Chat", chatSchema);
export default Chat;