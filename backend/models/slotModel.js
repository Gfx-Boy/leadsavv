import mongoose from 'mongoose';

const { Schema } = mongoose;

const slotSchema = new Schema({
  slot_time: {
    type: String,
    required: true
  },
  slot_date: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create the Slot model based on the schema
const SlotModel = mongoose.model('Slot', slotSchema);

export default SlotModel;
