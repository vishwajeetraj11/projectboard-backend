import { Project } from '../../models/Project.js';
import { User } from '../../models/User.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.userId).select(
    '-transaction -client_id -tenant -request_language'
  );
  // .populate({ path: 'projects' });

  // await Project.populate(user, )

  if (!user) {
    return next(new AppError('No user found.', 404));
  }
  res.status(200).json({
    status: 'success',
    user,
  });
});

export const updateProfile = catchAsync(async (req, res, next) => {
  const { username, firstName, lastName, photo } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    {
      username,
      firstName,
      lastName,
      photo,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    status: 'success',
    updatedUser,
  });
});

export const getUsers = catchAsync(async (req, res, next) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const count = await User.countDocuments({ ...keyword });
  const users = await Product.find({ ...keyword });
  // .limit(pageSize)
  // .skip(pageSize * (page - 1));
  res.json({ count, users });

  res.status(200).json({
    status: 'success',
    users: 'Array of users found.',
  });
});
