import express from 'express';
import {
  createTriggerLink,
  getTriggerLinks,
  getTriggerLinkById,
  updateTriggerLink,
  deleteTriggerLink,
} from '../controllers/triggerLinkController.js';
import { authenticateToken } from '../middleware/auth.js'; // Add this import

const router = express.Router();

router.post('/', authenticateToken, createTriggerLink);
router.get('/', authenticateToken, getTriggerLinks);
router.get('/:id', authenticateToken, getTriggerLinkById);
router.put('/:id', authenticateToken, updateTriggerLink);
router.delete('/:id', authenticateToken, deleteTriggerLink);

export default router;
