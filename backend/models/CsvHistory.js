import mongoose from 'mongoose';

const { Schema } = mongoose;

const csvHistorySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  importType: String,
  status: String,
  importedAt: Date,
  contactsImported: Number,
  opportunitiesImported: Number,
});

const CsvHistory = mongoose.model('CsvHistory', csvHistorySchema);

export default CsvHistory;