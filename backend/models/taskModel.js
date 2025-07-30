import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  status: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;