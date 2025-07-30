import express from 'express';
import {
  getContactAddedHistory,
  getEmailScrapedHistory,
  addEmailScrapedHistory,
  addContactAddedHistory,
} from '../controllers/historyController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// GET routes
router.get('/contacts', authenticateToken, getContactAddedHistory);
router.get('/emails', authenticateToken, getEmailScrapedHistory);

// POST routes for testing
router.post('/emails', authenticateToken, addEmailScrapedHistory);
router.post('/contacts', authenticateToken, addContactAddedHistory);

export default router;