import Chat from "../Models/Chat.js";
import User from "../Models/User.js";

// CREATE
export const createChat = async (req, res) => {
    try {
        const { personOne, personTwo, senderId, message } = req.body;

        const senderUser = await User.findById(personOne);
        const receiverUser = await User.findById(personTwo);
        if (!senderUser || !receiverUser) return res.status(404).json({ message: "User not found" });
        if (!senderUser.friends.includes(personTwo) || !receiverUser.friends.includes(personOne)) return res.status(404).json({ message: "User are friend of you" });
        if (senderId !== personOne && senderId !== personTwo) return res.status(404).json({ message: "Sender is not verified" });

        const userCase1 = await Chat.findOne({ personOne: personOne, personTwo: personTwo });
        const userCase2 = await Chat.findOne({ personOne: personTwo, personTwo: personOne });
        const user = userCase1 === null ? userCase2 : userCase1;
        user.messages.push({ senderId: senderId, message: message });
        await user.save();

        res.status(200).json({ message: "message send" });

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// READ
export const getChatData = async (req, res) => {
    try {
        const { personOne, personTwo } = req.body;
        const userCase1 = await Chat.findOne({ personOne: personOne, personTwo: personTwo });
        const userCase2 = await Chat.findOne({ personOne: personTwo, personTwo: personOne });
        const user = userCase1 === null ? userCase2 : userCase1;

        res.status(200).json(user.messages);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

