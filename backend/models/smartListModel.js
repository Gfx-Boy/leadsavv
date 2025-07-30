import mongoose from 'mongoose';

const smartListSchema = mongoose.Schema({
  name: { type: String, required: true },
  criteria: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

const SmartList = mongoose.model('SmartList', smartListSchema);

export default SmartList;