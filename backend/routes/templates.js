import express from 'express';
import { getTemplates, createTemplate, deleteTemplate } from '../controllers/templatesController.js';
import { authenticateToken } from '../middleware/auth.js'; // Updated import to use authenticateToken


const router = express.Router();

router.get('/', authenticateToken, getTemplates);
router.post('/', authenticateToken, createTemplate);
router.delete('/:id', authenticateToken, deleteTemplate);

export default router;