import mongoose from 'mongoose';

const OpportunitiesSchema = new mongoose.Schema({
  allowDifferentOwners: { type: Boolean, default: false },
  autoOpportunityOwnerFollower: { type: Boolean, default: true },
  autoContactOwnerFollower: { type: Boolean, default: true },
});

export default mongoose.model('Opportunities', OpportunitiesSchema);