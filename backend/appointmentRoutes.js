import express from 'express';
import * as appointmentController from './controllers/appointmentController';

const router = express.Router();

// Middleware to log all appointment routes
router.use(logRequests);

/*
 * GET all appointments
 */
router.get('appointment/', appointmentController.list);

/*
 * GET a specific appointment with populated slot data
 */
router.get('appointment/:id', (req, res) => {
  return res.json(req.appointment); // Return populated appointment
});

/*
 * POST a new appointment
 */
router.post('appointment/', appointmentController.create);

/*
 * PUT to update an existing appointment
 */
router.put('appointment/:id', appointmentController.update);

/*
 * DELETE an appointment
 */
router.delete('appointment/:id', appointmentController.remove);

export default router;
