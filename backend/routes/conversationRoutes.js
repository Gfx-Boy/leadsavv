import express from 'express';
import { getConversations, createConversation, getConversationById, updateConversation, deleteConversation } from '../controllers/conversationController.js';
import { authenticateToken } from '../middleware/auth.js'; // Import the authentication middleware


const router = express.Router();

router.get('/', authenticateToken, getConversations); // Apply middleware
router.post('/', authenticateToken, createConversation); // Apply middleware
router.get('/:id', authenticateToken, getConversationById); // Apply middleware
router.put('/:id', authenticateToken, updateConversation); // Apply middleware
router.delete('/:id', authenticateToken, deleteConversation); // Apply middleware


export default router;
