import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { checkJwt } from '../middlewares/authMiddleware.js';
import { attachUserMiddleware } from '../middlewares/attachUserMiddleware.js';

export const userRouter = Router();
userRouter.use(checkJwt);
userRouter.use(attachUserMiddleware);
userRouter.route('/profile').get(getProfile).patch(updateProfile);
