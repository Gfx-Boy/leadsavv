import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Reference to the User model
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'done'], // 'todo' for tasks to do, 'done' for completed tasks
    default: 'todo', // Default status is 'todo'
  },
  dueDate: {
    type: Date, // Store the due date
    required: false, // Optional field
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;