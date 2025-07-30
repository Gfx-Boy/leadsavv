import mongoose from 'mongoose';

const CampaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  template: { type: mongoose.Schema.Types.ObjectId, ref: 'Template' },
  recipients: {
    type: [String], // Store recipient emails as strings
    required: true,
  },
  scheduledDate: { type: Date },
  status: { type: String, enum: ['draft', 'sent', 'scheduled'], default: 'draft' },
  sent: { type: Number, default: 0 },
  opened: { type: Number, default: 0 },
  clicked: { type: Number, default: 0 },
  bounced: { type: Number, default: 0 },
});

export default mongoose.model('Campaign', CampaignSchema);