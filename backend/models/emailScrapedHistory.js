import mongoose from 'mongoose';

const emailScrapedHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  date: {
    type: Date,
    required: true,
    default: () => new Date().setHours(0, 0, 0, 0), // Store only the date (no time)
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

const EmailScrapedHistory = mongoose.model('EmailScrapedHistory', emailScrapedHistorySchema);

export default EmailScrapedHistory;