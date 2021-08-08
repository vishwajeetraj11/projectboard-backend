import { AppError } from '../../utils/AppError.js';
import { getUserDetails } from '../../utils/auth0.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const attachUserMiddleware = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const { data } = await getUserDetails(token);
      req.user = data;
      next();
    } catch (error) {
      next(new AppError('No Token found', 404));
    }
  }

  if (!token) {
    next(new AppError('No Token found', 404));
  }
});
