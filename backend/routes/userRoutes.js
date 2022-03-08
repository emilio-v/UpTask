import express from "express";
import {
  signUp,
  auth,
  confirm,
  resetPassword,
  validateToken,
  newPassword,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", signUp);
router.post("/login", auth);
router.get("/confirm/:token", confirm);
router.post("/reset-password", resetPassword);
/* when you have two equals endpoints, you can use the reserved word "route" */
// router.get("/reset-password/:token", validateToken);
// router.post("/reset-password/:token", newPassword);
router.route("/reset-password/:token").get(validateToken).post(newPassword);

export default router;
