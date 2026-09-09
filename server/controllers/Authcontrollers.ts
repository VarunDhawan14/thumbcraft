import { Request, Response } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import {
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "../services/emailService.js";

// =====================================================
// HELPER - GENERATE 6 DIGIT CODE
// =====================================================

const generateCode = () => {
  return crypto.randomInt(100000, 1000000).toString();
};

// =====================================================
// REGISTER
// =====================================================

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({
      email: normalizedEmail,
    });

    if (existingUser) {
      if (!existingUser.isVerified) {
        return res.status(400).json({
          message:
            "An account already exists with this email. Please verify your email.",
          requiresVerification: true,
          email: normalizedEmail,
        });
      }

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const verificationCode = generateCode();

    const newUser = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      isVerified: false,
      verificationCode,
      verificationCodeExpires: new Date(Date.now() + 10 * 60 * 1000),
    });

    await newUser.save();

    try {
      await sendVerificationEmail(
        newUser.email,
        newUser.name,
        verificationCode,
      );
    } catch (emailError) {
      console.error("Verification email error:", emailError);

      await User.findByIdAndDelete(newUser._id);

      return res.status(500).json({
        message: "Unable to send verification email. Please try again.",
      });
    }

    return res.status(201).json({
      message: "Verification code sent to your email",
      requiresVerification: true,
      email: newUser.email,
    });
  } catch (error: any) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: error.message || "Registration failed",
    });
  }
};

// =====================================================
// LOGIN
// =====================================================

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before logging in",
        requiresVerification: true,
        email: user.email,
      });
    }

    req.session.isLoggedIn = true;
    req.session.userID = user._id;

    return res.json({
      message: "Login successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: error.message || "Login failed",
    });
  }
};

// =====================================================
// VERIFY EMAIL
// =====================================================

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        message: "Email and verification code are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    if (
      !user.verificationCode ||
      !user.verificationCodeExpires ||
      user.verificationCodeExpires.getTime() < Date.now()
    ) {
      return res.status(400).json({
        message: "Verification code has expired",
      });
    }

    if (user.verificationCode !== code.trim()) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpires = null;

    await user.save();

    req.session.isLoggedIn = true;
    req.session.userID = user._id;

    return res.json({
      message: "Email verified successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Verify email error:", error);

    return res.status(500).json({
      message: error.message || "Email verification failed",
    });
  }
};

// =====================================================
// RESEND VERIFICATION CODE
// =====================================================

export const resendVerificationCode = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "Email is already verified",
      });
    }

    const verificationCode = generateCode();

    user.verificationCode = verificationCode;
    user.verificationCodeExpires = new Date(
      Date.now() + 10 * 60 * 1000,
    );

    await user.save();

    await sendVerificationEmail(
      user.email,
      user.name,
      verificationCode,
    );

    return res.json({
      message: "Verification code sent successfully",
    });
  } catch (error: any) {
    console.error("Resend verification error:", error);

    return res.status(500).json({
      message: error.message || "Unable to resend verification code",
    });
  }
};

// =====================================================
// FORGOT PASSWORD
// =====================================================

export const forgotPassword = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.json({
        message:
          "If an account exists with this email, a reset code has been sent.",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        message: "Please verify your email before resetting your password",
        requiresVerification: true,
        email: user.email,
      });
    }

    const resetPasswordCode = generateCode();

    user.resetPasswordCode = resetPasswordCode;
    user.resetPasswordCodeExpires = new Date(
      Date.now() + 10 * 60 * 1000,
    );

    await user.save();

    await sendPasswordResetEmail(
      user.email,
      resetPasswordCode,
    );

    return res.json({
      message:
        "If an account exists with this email, a reset code has been sent.",
      email: user.email,
    });
  } catch (error: any) {
    console.error("Forgot password error:", error);

    return res.status(500).json({
      message: error.message || "Unable to send reset code",
    });
  }
};

// =====================================================
// RESET PASSWORD
// =====================================================

export const resetPassword = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, code, password } = req.body;

    if (!email || !code || !password) {
      return res.status(400).json({
        message: "Email, reset code and new password are required",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters long",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid reset request",
      });
    }

    if (
      !user.resetPasswordCode ||
      !user.resetPasswordCodeExpires ||
      user.resetPasswordCodeExpires.getTime() < Date.now()
    ) {
      return res.status(400).json({
        message: "Reset code has expired",
      });
    }

    if (user.resetPasswordCode !== code.trim()) {
      return res.status(400).json({
        message: "Invalid reset code",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpires = null;

    await user.save();

    return res.json({
      message: "Password reset successfully. You can now login.",
    });
  } catch (error: any) {
    console.error("Reset password error:", error);

    return res.status(500).json({
      message: error.message || "Unable to reset password",
    });
  }
};

// =====================================================
// LOGOUT
// =====================================================

export const logoutUser = async (
  req: Request,
  res: Response,
) => {
  req.session.destroy((error: any) => {
    if (error) {
      console.error("Logout error:", error);

      return res.status(500).json({
        message: error.message,
      });
    }

    return res.json({
      message: "Logout successful",
    });
  });
};

// =====================================================
// VERIFY LOGGED-IN USER / SESSION
// =====================================================

export const verifyUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userID } = req.session;

    const user = await User.findById(userID).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid user",
      });
    }

    return res.json({
      user,
    });
  } catch (error: any) {
    console.error("Verify user error:", error);

    return res.status(500).json({
      message: error.message || "Unable to verify user",
    });
  }
};