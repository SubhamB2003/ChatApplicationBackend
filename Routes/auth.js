import express from "express";
import { Login } from "../Controllers/auth.js";

const router = express.Router();

// CREATE
router.post("/login", Login);

export default router;
