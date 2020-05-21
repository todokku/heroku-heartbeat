import { Schema, model } from 'mongoose';

export default model('Post', new Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1500,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
}), 'posts');
