import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
} from '../controllers/projectController.js';

import { checkJwt } from '../middlewares/authMiddleware.js';
import { attachUserMiddleware } from '../middlewares/attachUserMiddleware.js';

import { memberRouter } from './memberRoutes.js';
import { taskRouter } from './tasksRoutes.js';

export const projectRouter = Router();
projectRouter.use(checkJwt);
projectRouter.use(attachUserMiddleware);
projectRouter.use('/:projectId/tasks', taskRouter);
projectRouter.use('/:projectId/members', memberRouter);
projectRouter.route('/').get(getAllProjects).post(createProject);
projectRouter.get('/:id', getProjectById);
