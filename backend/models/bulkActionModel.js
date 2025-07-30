import mongoose from 'mongoose';

const bulkActionSchema = new mongoose.Schema({
  actionLabel: { type: String, required: true },
  operation: { type: String, required: true },
  status: { type: String, required: true },
  user: { type: String, required: true },
  created: { type: Date, default: Date.now },
  completed: { type: Date },
  statistics: { type: String },
});

export default mongoose.models.BulkAction || mongoose.model('BulkAction', bulkActionSchema);