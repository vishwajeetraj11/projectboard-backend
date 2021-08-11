import { Router } from 'express';
import {
  addMemberToProject,
  getAllMembersOfProject,
  deleteAmemberFromProject,
} from '../controllers/memberController.js';

import { checkJwt } from '../middlewares/authMiddleware.js';
import { attachUserMiddleware } from '../middlewares/attachUserMiddleware.js';

export const memberRouter = Router({ mergeParams: true });
memberRouter.use(checkJwt);
memberRouter.use(attachUserMiddleware);
memberRouter.route('/').get(getAllMembersOfProject);
memberRouter
  .route('/:id')
  .delete(deleteAmemberFromProject)
  .post(addMemberToProject);
