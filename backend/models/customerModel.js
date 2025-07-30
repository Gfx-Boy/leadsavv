import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    primaryKey: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  joined_date: {
    type: Date,
    required: true
  },
  lifetime_value: {
    type: mongoose.Types.Decimal128,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;