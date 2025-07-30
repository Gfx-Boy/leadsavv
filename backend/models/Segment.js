import mongoose from 'mongoose';

const SegmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  criteria: {
    type: [String], // Array of criteria (e.g., ["location:USA", "active:true"])
    required: true,
  },
  count: {
    type: Number,
    default: 0, // Number of subscribers in this segment
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Segment', SegmentSchema);