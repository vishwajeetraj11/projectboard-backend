import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
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
    default: 'No Description',
  },
  photo: {
    type: String,
  },
});

export const User = mongoose.model('User', userSchema);
