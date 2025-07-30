import mongoose from 'mongoose';

const triggerLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

const TriggerLink = mongoose.model('TriggerLink', triggerLinkSchema);

export default TriggerLink;