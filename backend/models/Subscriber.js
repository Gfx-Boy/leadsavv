import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  lastActive: { type: Date, default: Date.now },
});

// Create a compound index to ensure the combination of userId and email is unique
SubscriberSchema.index({ userId: 1, email: 1 }, { unique: true });

export default mongoose.model('Subscriber', SubscriberSchema);