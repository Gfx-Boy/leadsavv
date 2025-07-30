import mongoose from 'mongoose';
// import { v4 as uuidv4 } from 'uuid';

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }, // Add userId field


 
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  timestamp: { type: String, required: true },
  unread: { type: Boolean, default: true },
  avatar: { type: String, default: '👤' },
  lastMessage: { type: String, default: '' },
});

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
