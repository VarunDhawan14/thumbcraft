import express from 'express'
import { getThumbnailbyID, getUsersThumbnails } from '../controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.get('/thumbnails', getUsersThumbnails)
UserRouter.get('/thumbnails/:id', getThumbnailbyID)

export default UserRouter;
