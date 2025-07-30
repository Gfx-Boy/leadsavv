import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  emailFromName: { type: String, required: true },
  emailFromAddress: { type: String, required: true },
  replyToAddress: { type: String, required: true },
  emailFooter: { type: String, required: true },
  unsubscribeMessage: { type: String, required: true },
  trackOpens: { type: Boolean, default: true },
  trackClicks: { type: Boolean, default: true },
  doubleOptIn: { type: Boolean, default: true },
  smtpHost: { type: String, required: true },
  smtpPort: { type: Number, required: true },
  smtpUser:  { type: String, required: true },
  smtpPass: { type: String, required: true },
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;