import express from 'express';
import {
  getAllAutomations,
  createAutomation,
  getAutomationById,
  updateAutomation,
  deleteAutomation,
} from '../controllers/automationController.js'; // Updated import

const router = express.Router();

// Get all automations
router.get('/', getAllAutomations);

// Create a new automation
router.post('/', createAutomation);

// Get a specific automation
router.get('/:id', getAutomationById);

// Update a specific automation
router.put('/:id', updateAutomation);

// Delete a specific automation
router.delete('/:id', deleteAutomation);

export default router;
