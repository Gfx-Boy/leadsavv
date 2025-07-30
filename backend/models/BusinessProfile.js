import mongoose from 'mongoose';

const BusinessProfileSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  businessEmail: { type: String, required: true },
  businessPhone: { type: String, required: true },
  businessAddress: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true } // Associate with userId
});


export default mongoose.model('BusinessProfile', BusinessProfileSchema)
