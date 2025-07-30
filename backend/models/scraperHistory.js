import mongoose from 'mongoose';

const scraperHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true },
  keywords: { type: [String], required: true },
  locations: { type: [String], required: true },
  recordCount: { type: Number, required: true },
  data: { type: String, required: true },
  emails: { type: [String], required: true },
  date: { type: Date, default: Date.now },
});

const ScraperHistory = mongoose.model('ScraperHistory', scraperHistorySchema);

export default ScraperHistory;