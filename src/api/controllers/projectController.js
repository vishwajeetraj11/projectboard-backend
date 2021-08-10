import { catchAsync } from '../../utils/catchAsync.js';

export const getAllProjects = (req, res) => {
  return res.status(200).json({ status: 'Success get All Tasks' });
};

export const getProjectById = (req, res) => {
  // console.log(req.params);
  return res.status(200).json({ status: 'success' });
};

export const createProject = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const admin = {
    user: req.user.userId,
    access: 'admin',
  };
  const newProject = await Project.create({
    title,
    description,
    members: [admin],
  });
  return res.status(200).json({
    status: 'success',
    task: newProject,
  });
});
