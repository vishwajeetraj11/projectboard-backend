import mongoose from 'mongoose';

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // admin: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

projectSchema.virtual('members', {
  ref: 'Member',
  foreignField: 'project',
  localField: '_id',
});

export const Project = mongoose.model('Project', projectSchema);
