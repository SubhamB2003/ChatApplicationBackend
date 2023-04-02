import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


// IMPORT FILES
import { Register } from "./Controllers/auth.js";
import { DB } from "./Database/DB.js";
import addPeopleRoutes from "./Routes/addPeoples.js";
import authRoutes from "./Routes/auth.js";
import userConversation from "./Routes/conversation.js";
import userDatas from "./Routes/users.js";


// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();


// MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/", express.static(path.join(__dirname, "public")));


// FILE STORAGE
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "public");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });


// ROUTES WITH FILES 
app.post("/auth/register", upload.single("picture"), Register);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", addPeopleRoutes, userConversation, userDatas);


// DATABASE CONNECTION
DB();


// SERVER RUN
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server listening port http://localhost:${process.env.PORT || 5000}`);
})