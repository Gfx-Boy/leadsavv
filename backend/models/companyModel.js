import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model('Company', companySchema);

export default Company;