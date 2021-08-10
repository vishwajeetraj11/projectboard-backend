import { Project } from '../../models/Project.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const getAllProjects = catchAsync(async (req, res) => {
  const { scope } = req.query;
  const filterObj = {};
  if (scope === 'admin') {
    filterObj.admin = req.user.userId;
  }
  const projects = await Project.find(filterObj);
  return res.status(200).json({ status: 'success', projects });
});

export const getProjectById = (req, res) => {
  // console.log(req.params);
  return res.status(200).json({ status: 'success' });
};

export const createProject = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const newProject = await Project.create({
    title,
    description,
    admin: req.user.userId,
  });
  // const member = await
  return res.status(200).json({
    status: 'success',
    task: newProject,
  });
});
