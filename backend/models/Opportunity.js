import mongoose from 'mongoose';

const opportunitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pipelineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pipeline', required: true }, // Reference to the pipeline
  stageId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Reference to the specific stage
  title: { type: String, required: true },
  description: { type: String, required: true },
  value: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);

export default Opportunity;