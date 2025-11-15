import mongoose from 'mongoose';

const attemptSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    question: {
      type: String,
      required: true,
      trim: true
    },
    answer: {
      type: String,
      required: true
    },
    feedback: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

const Attempt = mongoose.model('Attempt', attemptSchema);

export default Attempt;
