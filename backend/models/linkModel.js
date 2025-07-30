import mongoose from 'mongoose';

const { Schema } = mongoose;

const linkSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: String,
  url: String,
});

const Link = mongoose.model('Link', linkSchema);

export default Link;