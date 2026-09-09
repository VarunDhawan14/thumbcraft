import express from "express";
import { sendContactMessage } from "../controllers/ContactController.js";
import protect from "../middlewares/auth.js";

const ContactRouter = express.Router();

ContactRouter.post("/", protect, sendContactMessage);

export default ContactRouter;