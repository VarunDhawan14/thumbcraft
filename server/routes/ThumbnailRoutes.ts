import express from "express";

import {
  deleteThumbnail,
  generateThumbnail,
  getMyThumbnails,
} from "../controllers/ThumbnailController.js";

import protect from "../middlewares/auth.js";

const ThumbnailRouter = express.Router();

ThumbnailRouter.get(
  "/",
  protect,
  getMyThumbnails,
);

ThumbnailRouter.post(
  "/generate",
  protect,
  generateThumbnail,
);

ThumbnailRouter.delete(
  "/delete/:id",
  protect,
  deleteThumbnail,
);

export default ThumbnailRouter;