import { Member } from '../../models/Member.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const accessToProjectMiddleware = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const isAdmin = await Member.findOne({
    user: req.user.userId,
    project: projectId,
    access: 'admin',
  });
  if (!isAdmin) {
    return next(
      new AppError(
        'You need to be admin inorder to add members in project',
        403
      )
    );
  }
  next();
});
