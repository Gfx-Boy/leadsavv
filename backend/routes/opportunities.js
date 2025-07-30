import express from 'express';
import { updateOpportunities, getOpportunities } from '../controllers/opportunitiesController.js';

const router = express.Router();

// Create or Update Opportunities Settings
router.post('/', updateOpportunities);

// Get Opportunities Settings
router.get('/', getOpportunities);

export default router;