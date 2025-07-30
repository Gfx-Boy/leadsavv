import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  deleted: { type: Boolean, default: false },
});

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;