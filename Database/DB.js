import mongoose from "mongoose";

export const DB = () => mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Database connection successfull");
}).catch((err) => {
    console.log(err.message);
})
mongoose.set('strictQuery', true);