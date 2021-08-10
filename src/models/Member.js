import mongoose from 'mongoose';

const memberSchema = mongoose.Schema({
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
  access: {
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

export const Member = mongoose.model('Member', memberSchema);
