import mongoose from 'mongoose';

const LocalizationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Add userId field
  defaultLanguage: { type: String, required: true },
  regionFormat: { type: String, required: true },
  timeZone: { type: String, required: true },
  timeFormat: { type: String, required: true },
  dateFormat: { type: String, required: true },
  firstDayOfWeek: { type: String, required: true },
  currency: { type: String, required: true },
  numberFormat: { type: String, required: true },
});

export default mongoose.model('Localization', LocalizationSchema);
