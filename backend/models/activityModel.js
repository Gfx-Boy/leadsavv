import mongoose from 'mongoose';

const { Schema } = mongoose;

const activitySchema = new Schema({
  activity_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
    primaryKey: true
  },
  lead_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',
    required: true
  },
  type: {
    type: String,
    enum: ['Call', 'Email', 'Meeting'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;