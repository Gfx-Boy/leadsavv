import mongoose from 'mongoose';

const { Schema } = mongoose;

const leadSchema = new Schema({
  lead_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    primaryKey: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  source: {
    type: String,
    enum: ['Ads', 'Referral', 'Organic', 'Other'],
    required: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted'],
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;