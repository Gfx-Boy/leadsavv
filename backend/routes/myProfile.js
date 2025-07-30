import express from 'express';
import { updateMyProfile, getMyProfile } from '../controllers/myProfileController.js';

const router = express.Router();

// Create or Update My Profile
router.post('/', updateMyProfile);

// Get My Profile
router.get('/', getMyProfile);

export default router;