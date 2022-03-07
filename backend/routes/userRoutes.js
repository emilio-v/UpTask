import express from "express";
import { signUp, auth } from "../controllers/userController.js";

const router = express.Router();

router.post("/", signUp);
router.post("/login", auth);

export default router;
