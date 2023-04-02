import Chat from "../Models/Chat.js";
import User from "../Models/User.js";

// ADD FRIENDS || PATCH
export const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
        if (!user || !friend) {
            res.status(400).json({ message: "User not found" });
        }
        if (user.friends.includes(friendId) && friend.friends.includes(userId)) return res.status(202).json({ message: "Already Exists." });
        if (!user.friends.includes(friendId) && !friend.friends.includes(userId)) {
            user.friends.push(friendId);
            friend.friends.push(userId);
        }
        await user.save();
        await friend.save();
        const conversation1 = await Chat.findOne({ personOne: userId, personTwo: friendId });
        const conversation2 = await Chat.findOne({ personOne: friendId, personTwo: userId });

        if (!conversation1 && !conversation2) {
            const newChatConversation = new Chat({
                personOne: userId,
                personTwo: friendId
            });
            await newChatConversation.save();
        }
        res.status(200).json({ message: "User added" });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// REMOVE FRIENDS || DELETE
export const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }

        if (user.friends.includes(friendId) && friend.friends.includes(userId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== userId);
        }
        await user.save();
        await friend.save();
        const conversation = await Chat.findOne({ personOne: userId, personTwo: friendId });
        await Chat.findByIdAndDelete(conversation.id);
        res.status(200).json({ message: "User removed" });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}