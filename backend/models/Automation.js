import mongoose from 'mongoose';

const AutomationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'paused'], default: 'active' },
  triggers: { type: [String], required: true },
  steps: { type: Number, required: true },
});

export default mongoose.model('Automation', AutomationSchema);