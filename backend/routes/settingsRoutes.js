import express from 'express';
import { createOrUpdateSettings, getSettings } from '../controllers/settingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Route to create user settings
router.post('/', authenticateToken, createOrUpdateSettings);

// Route to update user settings
router.put('/', authenticateToken, createOrUpdateSettings);

// Route to get user settings
router.get('/', authenticateToken, getSettings);

export default router;
