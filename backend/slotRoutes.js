import express from 'express';
import { createSlot, getSlot, getAllSlots, updateSlot, deleteSlot } from './controllers/slotController.js';

const router = express.Router();

// Route to create a new slot
router.post('/slots', createSlot);

// Route to get a single slot by ID
router.get('/slots/:id', getSlot);

// Route to get all slots
router.get('/slots', getAllSlots);

// Route to update a slot by ID
router.put('/slots/:id', updateSlot);

// Route to delete a slot by ID
router.delete('/slots/:id', deleteSlot);

export default router;
