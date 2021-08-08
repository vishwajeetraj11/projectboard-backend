import axios from 'axios';
import { AppError } from '../../utils/AppError.js';
import { getUserDetails } from '../../utils/auth0.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const getAllTasks = catchAsync(async (req, res, next) => {
  console.log(req.user);
  return res.status(200).json({ status: 'Success get All Tasks' });
});

export const getTaskById = (req, res) => {
  // console.log(req.params);
  return res.status(200).json({ status: 'success' });
};

export const createTask = (req, res) => {
  console.log(req.params);
  return res.status(200).json({
    status: 'success',
  });
};
