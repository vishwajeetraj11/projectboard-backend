import { Member } from '../../models/Member.js';
import { User } from '../../models/User.js';
import { Project } from '../../models/Project.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const addMemberToProject = catchAsync(async (req, res, next) => {
  const { projectId, id } = req.params;
  // console.log({ currentUser: req.user.userId, userToAdd: id });
  const project = await Project.findById(projectId);
  if (!project) {
    next(
      new AppError(
        'The project you are trying to add a member in does not exist.'
      ),
      404
    );
  }
  const memberAlreadyExist = await Member.findOne({
    user: id,
    project: project._id,
  });

  if (memberAlreadyExist) {
    return next(
      new AppError('This user is already a member in the project.', 409)
    );
  }
  const member = await Member.create({
    project: project._id,
    user: id,
    access: 'member',
  });
  return res.status(201).json({
    status: 'success',
    project: project,
    member,
  });
});

export const getAllMembersOfProject = catchAsync(async (req, res) => {
  const { projectId } = req.params;
  const members = await Member.find({ project: projectId }).select(
    'user access'
  );
  await User.populate(members, {
    path: 'user',
  });
  res.status(200).json({ status: 'success', count: members.length, members });
});

export const deleteAmemberFromProject = catchAsync(async (req, res, next) => {
  const member = await Member.findById(req.params.id);
  if (member.access === 'admin') {
    return next(
      new AppError('An admin cannot remove itself from project.', 406)
    );
  }
  const deletedMember = await Member.findByIdAndDelete(req.params.id);
  if (!deletedMember) {
    return next(
      new AppError("The member you are trying to delete doesn't exist.", 404)
    );
  }
  res
    .status(204)
    .json({ status: 'success', message: 'Member removed successfully' });
});
