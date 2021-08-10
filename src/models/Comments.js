import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Project',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Task',
  },
  comment: {
    type: String,
    required: true,
  },
});

export const Comment = mongoose.model('Comment', commentSchema);
