import express from "express";

import {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerificationCode,
  forgotPassword,
  resetPassword,
  verifyUser,
  logoutUser,
} from "../controllers/Authcontrollers.js"

import protect from "../middlewares/auth.js";

const AuthRouter = express.Router();

// Register
AuthRouter.post("/register", registerUser);

// Login
AuthRouter.post("/login", loginUser);

// Email Verification
AuthRouter.post("/verify-email", verifyEmail);

// Resend Verification Code
AuthRouter.post("/resend-verification", resendVerificationCode);

// Forgot Password
AuthRouter.post("/forgot-password", forgotPassword);

// Reset Password
AuthRouter.post("/reset-password", resetPassword);

// Verify Logged-in User
AuthRouter.get("/verify", protect, verifyUser);

// Logout
AuthRouter.post("/logout", protect, logoutUser);

export default AuthRouter;