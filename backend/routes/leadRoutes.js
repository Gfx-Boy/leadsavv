import express from 'express';
import {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead
} from '../controllers/leadController.js';

const router = express.Router();

/*
 * POST a new lead
 */
router.post('/leads', authenticateToken, createLead);
router.get('/leads', authenticateToken, getLeads);
router.get('/leads/:id', authenticateToken, getLeadById);
router.put('/leads/:id', authenticateToken, updateLead);
router.delete('/leads/:id', authenticateToken, deleteLead);


export default router;
