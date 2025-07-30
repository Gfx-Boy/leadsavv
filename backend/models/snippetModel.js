import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  content: { type: String, required: true },
  folder: { type: String, required: true },
  type: { type: String, required: true }
});

export default mongoose.model('Snippet', snippetSchema);