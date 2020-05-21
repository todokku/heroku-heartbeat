import { Schema, model } from 'mongoose';

export default model('User', new Schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
    maxlength: 225,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 225,
  },
}), 'users');
