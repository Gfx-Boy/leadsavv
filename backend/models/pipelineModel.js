import mongoose from 'mongoose';

const stageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  opportunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Opportunity' }] // Array of opportunities
});

const pipelineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stages: [stageSchema], // Embed the stage schema
  visibleInFunnel: { type: Boolean, default: true },
  visibleInPie: { type: Boolean, default: true },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Pipeline = mongoose.model('Pipeline', pipelineSchema);

export default Pipeline;