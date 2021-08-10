import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import { checkJwt } from '../middlewares/authMiddleware.js';
import { attachUserMiddleware } from '../middlewares/attachUserMiddleware.js';

export const userRoutes = Router();
userRoutes.use(checkJwt);
userRoutes.use(attachUserMiddleware);
userRoutes.route('/profile').get(getProfile).patch(updateProfile);
