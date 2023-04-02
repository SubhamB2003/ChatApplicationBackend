import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";


// REGISTER USER
export const Register = async (req, res) => {
    try {
        const { userName, email, password, picturePath, about } = req.body;
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ userName, email, password: hashPassword, picturePath, about });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// LOGIN USER
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ message: "User does't exists." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({ token, user });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}



