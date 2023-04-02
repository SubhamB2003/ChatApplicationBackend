import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    picturePath: {
        type: String,
        required: true
    },
    about: String,
    friends: {
        type: Array,
        default: []
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;