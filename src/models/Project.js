import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    select: false,
  },
  members: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      access: {
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
      },
    },
  ],
});

export const Project = mongoose.model('Project', projectSchema);
