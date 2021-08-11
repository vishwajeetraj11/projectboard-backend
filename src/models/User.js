import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    email_verified: {
      type: String,
    },
    photo: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
userSchema.virtual('projects', {
  ref: 'Member',
  foreignField: 'user',
  localField: '_id',
});

// userSchema.set('toObject', { virtuals: true });
// userSchema.set('toJSON', { virtuals: true });

export const User = mongoose.model('User', userSchema);
