import express from 'express'
import { getThumbnailbyID, getUsersThumbnails } from '../controllers/UserController.js';
import protect from '../middlewares/auth.js';

const UserRouter = express.Router();

UserRouter.get('/thumbnails',protect, getUsersThumbnails)
UserRouter.get('/thumbnails/:id',protect, getThumbnailbyID)

export default UserRouter;
