import { User } from '../../models/User.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (!user) {
    next(new AppError('No user found.', 404));
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
