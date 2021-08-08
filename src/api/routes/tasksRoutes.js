import { Router } from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
} from '../controllers/tasksController.js';
import { checkJwt } from '../middlewares/authMiddleware.js';
import { attachUserMiddleware } from '../middlewares/attachUserMiddleware.js';

export const taskRouter = Router();
taskRouter.use(checkJwt);
taskRouter.use(attachUserMiddleware);
taskRouter.route('/').get(getAllTasks).post(createTask);
taskRouter.get('/:id', getTaskById);
