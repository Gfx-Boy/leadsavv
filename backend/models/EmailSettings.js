import mongoose from 'mongoose';

const emailSettingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  smtpServer: { type: String, required: true },
  port: { type: Number, required: true },
  fromEmail: { type: String, required: true },
  emailPassword: { type: String, required: true },
  fromName: { type: String, required: true },
  security: { type: String, required: true },
});

const EmailSettings = mongoose.model('EmailSettings', emailSettingsSchema);

export default EmailSettings;