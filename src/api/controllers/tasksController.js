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
  }).sort('order');
  await Member.populate(tasks, {
    path: 'assignee author',
  });
  await User.populate(tasks, {
    path: 'author.user assignee.user',
  });
  return res.status(200).json({ status: 'success', tasks });
});

export const getTaskById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate({
    path: 'author project assignee',
    Model: [User, Project, Member],
  });
  await User.populate(task, {
    path: 'assignee.user',
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

  const tasksWithSameStatus = await Task.find({
    status: req.body.status,
    project: projectId,
  });
  const newTask = await Task.create({
    ...req.body,
    author: req.user.memberId,
    project: projectId,
    order: tasksWithSameStatus.length,
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

  const taskToDelete = await Task.findById(id);
  if (!taskToDelete) {
    return next(
      new AppError("The Task you are trying to delete doesn't exist.", 404)
    );
  }
  // db.collection.updateMany(filter, update, options)
  await Task.updateMany(
    {
      status: taskToDelete.status,
      project: taskToDelete.project,
      order: {
        $gt: taskToDelete.order,
      },
    },
    {
      $inc: { order: -1 },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  await taskToDelete.remove();

  res.status(204).json({
    status: 'success',
    message: 'Task removed successfully',
  });
});

// Board Drag n Drop
export const updateTaskStatus = catchAsync(async (req, res, next) => {
  const { id, projectId } = req.params;
  const { destinationStatus, sourceStatus, sourceIndex, destinationIndex } =
    req.body;

  const task = await Task.findById(id);
  if (!task) {
    return next(new AppError('Task not found.', 404));
  }
  // const srcStatusTasks = await Task.updateMany(
  await Task.updateMany(
    {
      status: sourceStatus,
      project: projectId,
      order: {
        $gt: task.order,
      },
    },
    {
      $inc: { order: -1 },
    }
  );

  // const destStatusTasks = await Task.updateMany(
  await Task.updateMany(
    {
      status: destinationStatus,
      project: projectId,
      order: {
        $gte: destinationIndex,
      },
    },
    {
      $inc: { order: 1 },
    }
  );

  task.status = destinationStatus;
  task.order = destinationIndex;
  await task.save();

  const sourceTasks = await Task.find({
    project: projectId,
    status: sourceStatus,
  });

  const destinationTasks = await Task.find({
    project: projectId,
    status: destinationStatus,
  });

  res.status(200).json({
    status: 'success',
    destinationStatus,
    sourceStatus,
    sourceIndex,
    destinationIndex,
    task,
    sourceTasks,
    destinationTasks,
  });
});
