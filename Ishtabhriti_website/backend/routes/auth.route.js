import express from "express";
import {
  approveUser,
  checkAdmin,
  checkAuth,
  forgotPassword,
  listAllUsers,
  login,
  logout,
  resendVerificationCode,
  resetPassword,
  signup,
  verifyEmail,
} from "../controllers/auth.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//different authentication routes

router.get("/check-auth", verifyToken, checkAuth);
router.get("/check-admin", verifyToken, checkAdmin);
router.post("/signup", signup);

router.post("/login", login);
// router.route("/login").post(loginLimiter, login);

router.post("/logout", logout);
router.get("/users", verifyToken, listAllUsers);

router.post("/verifyemail", verifyEmail);
router.post("/resend-verification-mail", resendVerificationCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/approve-user", verifyToken, approveUser);
export default router;
