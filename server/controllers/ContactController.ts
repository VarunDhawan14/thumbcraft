import { Request, Response } from "express";
import User from "../models/User.js";
import { sendContactEmail } from "../services/emailService.js";

export const sendContactMessage = async (
  req: Request,
  res: Response,
) => {
  try {
    const { userID } = req.session;
    const { name, topic, message } = req.body;

    if (!userID) {
      return res.status(401).json({
        message: "Please login to contact us",
      });
    }

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).json({
        message: "User account not found",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email before contacting us",
      });
    }

    if (!name?.trim()) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    if (!message?.trim()) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        message: "Name is too long",
      });
    }

    if (message.trim().length > 1000) {
      return res.status(400).json({
        message: "Message is too long",
      });
    }

    await sendContactEmail(
      name.trim(),
      user.email,
      topic?.trim() || "General Query",
      message.trim(),
    );

    return res.status(200).json({
      message: "Your message has been sent successfully!",
    });
  } catch (error: any) {
    console.error("Contact message error:", error);

    return res.status(500).json({
      message:
        "Unable to send your message right now. Please try again later.",
    });
  }
};