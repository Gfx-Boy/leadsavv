import mongoose from 'mongoose';

const meetingSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: 'active', // New field to track status
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true, // Associate with userId
    },
  },

  {
    timestamps: true,
  }
);

const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;
