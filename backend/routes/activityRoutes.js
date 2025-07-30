import express from 'express';
import {
  createActivity,
  getActivities,
  getActivityById,
  updateActivity,
  deleteActivity
} from '../controllers/activityController.js';

const router = express.Router();

/*
 * POST a new activity
 */
router.post('/activities', createActivity);

/*
 * GET all activities
 */
router.get('/activities', getActivities);

/*
 * GET a single activity by ID
 */
router.get('/activities/:id', getActivityById);

/*
 * PUT to update an existing activity
 */
router.put('/activities/:id', updateActivity);

/*
 * DELETE an activity
 */
router.delete('/activities/:id', deleteActivity);

export default router;