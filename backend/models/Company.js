import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Company = mongoose.model('Company', companySchema);

export default Company;