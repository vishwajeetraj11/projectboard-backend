import { catchAsync } from '../../utils/catchAsync.js';
import { Task } from '../../models/Task.js';
import { AppError } from '../../utils/AppError.js';
import { User } from '../../models/User.js';
import { Member } from '../../models/Member.js';
import { Project } from '../../models/Project.js';

export const getAllTasks = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const tasks = await Task.find({
    project: projectId,
  });
  await User.populate(tasks, {
    path: 'author',
    select: '-transaction -client_id -tenant -request_language',
  });
  return res.status(200).json({ status: 'success', tasks });
});

export const getTaskById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate({
    path: 'author project',
    Model: [User, Project],
  });
  if (!task) {
    return next(
      new AppError("The Task you are looking for doesn't exist.", 404)
    );
  }
  return res.status(200).json({ status: 'success', task });
});

export const createTask = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const newTask = await Task.create({
    ...req.body,
    author: req.user.userId,
    project: projectId,
  });
  return res.status(200).json({
    status: 'success',
    task: newTask,
  });
});

export const updateTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    return next(
      new AppError("The ask you are trying to update doesn't exist.", 404)
    );
  }
  res.status(200).json({
    status: 'success',
    updatedTask,
  });
});

export const deleteTask = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);
  if (!deletedTask) {
    return next(
      new AppError("The Task you are trying to delete doesn't exist.", 404)
    );
  }
  res.status(204).json({
    status: 'success',
    message: 'Member removed successfully',
  });
});
