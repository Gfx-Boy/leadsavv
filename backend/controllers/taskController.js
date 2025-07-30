import Task from '../models/Task.js';

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, dueDate } = req.body;

  try {
    const task = new Task({
      userId: req.userId, // Associate the task with the logged-in user
      title,
      description,
      dueDate, // Include the due date
    });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all tasks for the logged-in user
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }); // Filter tasks by userId
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get tasks by status (todo or done) for the logged-in user
export const getTasksByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const tasks = await Task.find({ userId: req.userId, status }); // Filter tasks by userId and status
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark a task as done
export const markTaskAsDone = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId }, // Ensure the task belongs to the logged-in user
      { status: 'done' },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateDueDate = async (req, res) => {
  const { id } = req.params;
  const { dueDate } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId }, // Ensure the task belongs to the logged-in user
      { dueDate }, // Update the due date
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getTasksByDueDate = async (req, res) => {
  const { dueDate } = req.query;

  try {
    const tasks = await Task.find({
      userId: req.userId,
      dueDate: { $eq: new Date(dueDate) }, // Filter tasks by the exact due date
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the task by ID and ensure it belongs to the logged-in user
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });

    if (!task) {
      return res.status(404).json({ message: "Task not found or you don't have permission to delete it." });
    }

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "An error occurred while deleting the task." });
  }
};