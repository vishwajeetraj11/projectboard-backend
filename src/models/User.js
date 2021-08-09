import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
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
    default: 'No Description',
  },
});

export const User = mongoose.model('User', userSchema);
