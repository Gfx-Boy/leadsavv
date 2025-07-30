import express from 'express';
import { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment } from '../controllers/appointmentController.js';
import { authenticateToken } from '../middleware/auth.js'; // Add this import

const router = express.Router();

router.get('/', authenticateToken, getAppointments);
router.post('/', authenticateToken, createAppointment);
router.get('/:id', authenticateToken, getAppointment);
router.put('/:id', authenticateToken, updateAppointment);
router.delete('/:id', authenticateToken, deleteAppointment);

export default router;
