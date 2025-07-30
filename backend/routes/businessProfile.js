import express from 'express';
import { updateBusinessProfile, getBusinessProfile } from '../controllers/businessProfileController.js';
import { authenticateToken } from '../middleware/auth.js';
const router = express.Router();

router.post('/', authenticateToken, updateBusinessProfile);


router.get('/', authenticateToken, getBusinessProfile);


export default router;
