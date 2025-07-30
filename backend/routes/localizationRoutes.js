import express from 'express';
import { updateLocalization, getLocalization } from '../controllers/localizationController.js';

const router = express.Router();

// Create or Update Localization Settings
router.post('/', updateLocalization);

// Get Localization Settings
router.get('/', getLocalization);

export default router;