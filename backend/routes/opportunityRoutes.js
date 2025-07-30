import express from 'express';
import {
  createOpportunity,
  getOpportunitiesForStage,
  deleteOpportunity
} from '../controllers/opportunityController.js';
import {  authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Create an opportunity for a specific stage
router.post('/:pipelineId/:stageId/opportunities', authenticateToken, createOpportunity);

// Get all opportunities for a specific stage
router.get('/:pipelineId/:stageId/opportunities', authenticateToken, getOpportunitiesForStage);

// Delete an opportunity from a specific stage
router.delete('/:pipelineId/:stageId/opportunities/:opportunityId', authenticateToken, deleteOpportunity);

export default router;