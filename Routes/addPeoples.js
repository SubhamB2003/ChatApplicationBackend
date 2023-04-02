import express from "express";
import { addFriend, removeFriend } from "../Controllers/addPeoples.js";

const router = express.Router();

// Update
router.patch("/addfriend", addFriend);
// Delete
router.delete("/removefriend", removeFriend);

export default router;
