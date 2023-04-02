import express from "express";
import { getAllUsers, getChatUsers } from "../Controllers/user.js";

const router = express.Router();

// READ
router.get("/all", getAllUsers);
router.get("/chatusers/:userId", getChatUsers);

export default router;
