import express from 'express';
import { authenticateToken } from '../middleware/auth.js'; // Updated import to use authenticateToken
import {
  getSubscribers,
  addSubscriber,
  deleteSubscriber,
} from '../controllers/subscribersController.js';

const router = express.Router();

router.get('/', authenticateToken, getSubscribers);
router.post('/', authenticateToken, addSubscriber);
router.delete('/:id', authenticateToken, deleteSubscriber);

export default router;
