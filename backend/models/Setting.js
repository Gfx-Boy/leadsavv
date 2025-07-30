import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  emailSettings: {
    smtpHost: { type: String },
    smtpPort: { type: Number },
    smtpUser: { type: String },
    smtpPassword: { type: String },
    fromEmail: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
