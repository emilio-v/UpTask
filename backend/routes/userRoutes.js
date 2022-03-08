import express from "express";
import { signUp, auth, confirm } from "../controllers/userController.js";

const router = express.Router();

router.post("/", signUp);
router.post("/login", auth);
router.get("/confirm/:token", confirm);

export default router;
