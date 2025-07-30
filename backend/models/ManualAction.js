import mongoose from 'mongoose';

const manualActionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignee: { type: String, required: true },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  dueDate: { type: String, required: true },
});

const ManualAction = mongoose.model('ManualAction', manualActionSchema);

export default ManualAction;