import { model, Schema } from 'mongoose';
import User from '../types/User';

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default model<User>('User', userSchema);
