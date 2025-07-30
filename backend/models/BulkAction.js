import mongoose from 'mongoose';

const bulkActionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  action: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BulkAction = mongoose.model('BulkAction', bulkActionSchema);

export default BulkAction;
