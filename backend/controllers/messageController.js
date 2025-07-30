import Message from '../models/Message.js';

// Create a new message
export const createMessage = async (req, res) => {
  const message = new Message({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all messages for a conversation
export const getMessagesByConversationId = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.conversationId, userId: req.user._id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get all messages for a user
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.user._id });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single message by ID
export const getMessage = async (req, res) => {
  try {
    const messageId = req.params.id.trim();
    const message = await Message.findOne({ _id: messageId, userId: req.user._id });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a message
export const updateMessage = async (req, res) => {
  try {
    const messageId = req.params.id.trim();
    const message = await Message.findOneAndUpdate({ _id: messageId, userId: req.user._id }, req.body, { new: true });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a message
export const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id.trim();
    const message = await Message.findOneAndDelete({ _id: messageId, userId: req.user._id });
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};