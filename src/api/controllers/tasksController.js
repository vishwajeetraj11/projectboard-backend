import { catchAsync } from '../../utils/catchAsync.js';
import { Task } from '../../models/Task.js';
import { AppError } from '../../utils/AppError.js';
import { User } from '../../models/User.js';

export const getAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ author: req.user.userId });
  await User.populate(tasks, { path: 'author', select: 'email _id' });
  return res.status(200).json({ status: 'success', tasks });
});

export const getTaskById = (req, res) => {
  // console.log(req.params);
  return res.status(200).json({ status: 'success' });
};

export const createTask = catchAsync(async (req, res) => {
  const newTask = await Task.create({ ...req.body, author: req.user.userId });

  return res.status(200).json({
    status: 'success',
    task: newTask,
  });
});
