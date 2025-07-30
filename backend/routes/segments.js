import express from 'express';
import {
  getSegments,
  getSegmentSubscribers,
  createSegment,
  updateSegment,
  deleteSegment,
} from '../controllers/segmentsController.js';
import {authenticateToken} from '../middleware/auth.js';

const router = express.Router();

// Get all segments for the logged-in user
router.get('/',authenticateToken, getSegments);

// Get subscribers in a segment
router.get('/:id/subscribers',authenticateToken, getSegmentSubscribers);

// Create a new segment
router.post('/',authenticateToken, createSegment);

// Update an existing segment
router.put('/:id',authenticateToken, updateSegment);

// Delete a segment
router.delete('/:id',authenticateToken, deleteSegment);

export default router;