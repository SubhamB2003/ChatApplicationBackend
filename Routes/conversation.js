import express from "express";
import { createChat, getChatData } from "../Controllers/conversation.js";

const router = express.Router();

// CREATE CHAT
router.patch('/message', createChat);

// READ DATA
router.get('/chat', getChatData);

export default router;