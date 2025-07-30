import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/validate-token', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Token is valid', user: req.user });
});

export default router;
