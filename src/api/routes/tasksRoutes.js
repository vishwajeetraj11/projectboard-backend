import { Router } from 'express';
import {
	getAllTasks,
	getTaskById,
	createTask,
} from '../controllers/tasksController.js';

export const taskRouter = Router();

taskRouter.route('/').get(getAllTasks).post(createTask);
taskRouter.get('/:id', getTaskById);
