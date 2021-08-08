import { Router } from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
} from '../controllers/projectController.js';

export const projectRouter = Router();

projectRouter.route('/').get(getAllProjects).post(createProject);
projectRouter.get('/:id', getProjectById);
