import express from 'express';
import {
  createTask,
  getAllTasks,
  getTasksByStatus,
  markTaskAsDone,
  updateDueDate,
  getTasksByDueDate,
  deleteTask,
} from '../controllers/taskController.js';
import { authenticateToken } from '../middleware/auth.js'; // Middleware to authenticate users

const router = express.Router();

// Create a new task
router.post('/', authenticateToken, createTask);

// Get all tasks for the logged-in user
router.get('/', authenticateToken, getAllTasks);

// Get tasks by status (todo or done) for the logged-in user
router.get('/status/:status', authenticateToken, getTasksByStatus);

// Mark a task as done
router.put('/:id/done', authenticateToken, markTaskAsDone);

// Update the due date of a task
router.put('/:id/due-date', authenticateToken, updateDueDate);

// Get tasks by due date
router.get('/due-date', authenticateToken, getTasksByDueDate);

// Delete a task
router.delete('/:id', authenticateToken, deleteTask);

export default router;