import Conversation from '../models/Conversation.js';

// Create a new conversation
export const createConversation = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  
  const conversation = new Conversation({

    ...req.body,
    userId: req.userId,

  });

  try {
    const savedConversation = await conversation.save();
    res.status(201).json(savedConversation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all conversations for a user
export const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ userId: req.userId });

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single conversation by ID
export const getConversationById = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ _id: req.params.id, userId: req.userId });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found.' });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a conversation
export const updateConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },

      req.body,
      { new: true }
    );
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found.' });
    }
    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a conversation
export const deleteConversation = async (req, res) => {
  try {
    const conversation = await Conversation.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found.' });
    }
    res.json({ message: 'Conversation removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
