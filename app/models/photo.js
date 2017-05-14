import mongoose from 'mongoose';
import { prepareSuccessAnswer } from '../utils/prepareAnswer';

const imageSchema = new mongoose.Schema({
  path: {
    type: String,
    unique: false,
    lowercase: true
  },
  likes: {
    type: Number,
    unique: false
  }
});

imageSchema.methods.prepareDataForResponse = function () {
  return { ...prepareSuccessAnswer(this) };
};

export default mongoose.model('Photo', imageSchema);
