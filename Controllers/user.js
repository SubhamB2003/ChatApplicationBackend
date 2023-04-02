import User from "../Models/User.js";


// READ
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

export const getChatUsers = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user.friends);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}