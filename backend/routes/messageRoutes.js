import express from 'express';
import {
  createMessage,
  getMessagesByConversationId,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController.js';
import { authenticateToken } from '../middleware/auth.js'; // Add this import

const router = express.Router();

router.post('/', authenticateToken, createMessage);
router.get('/:conversationId', authenticateToken, getMessagesByConversationId);
router.put('/:id', authenticateToken, updateMessage);
router.delete('/:id', authenticateToken, deleteMessage);

export default router;
