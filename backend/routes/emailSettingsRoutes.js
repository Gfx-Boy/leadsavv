import express from 'express';
import { getEmailSettings, createEmailSettings, updateEmailSettings, sendEmailToSubscriber } from '../controllers/emailSettingsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getEmailSettings);
router.post('/', authenticateToken, createEmailSettings);
router.put('/', authenticateToken, updateEmailSettings);
router.post('/send', authenticateToken, sendEmailToSubscriber);

export default router;