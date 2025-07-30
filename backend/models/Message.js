import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', required: true },
  sender: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: String, required: true },
  type: { type: String, enum: ['sent', 'received'], required: true },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;