import { Router } from 'express';
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from '../controllers/tasksController.js';
import { checkJwt } from '../middlewares/authMiddleware.js';
import { attachUserMiddleware } from '../middlewares/attachUserMiddleware.js';
import { accessToProjectMiddleware } from '../middlewares/accessToProjectMiddleware.js';

export const taskRouter = Router({ mergeParams: true });
taskRouter.use(checkJwt);
taskRouter.use(attachUserMiddleware);
taskRouter.use(accessToProjectMiddleware);
taskRouter.route('/').get(getAllTasks).post(createTask);
taskRouter.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask);
