import express from "express";
import {
  signUp,
  auth,
  confirm,
  resetPassword,
  validateToken,
  newPassword,
  profile,
} from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.post("/", signUp);
router.post("/login", auth);
router.get("/confirm/:token", confirm);
router.post("/reset-password", resetPassword);
/* when you have two equals endpoints, you can use the reserved word "route" */
// router.get("/reset-password/:token", validateToken);
// router.post("/reset-password/:token", newPassword);
router.route("/reset-password/:token").get(validateToken).post(newPassword);

// checkAuth verify if everything is ok before enter to profile
router.get("/profile", checkAuth, profile);

export default router;
