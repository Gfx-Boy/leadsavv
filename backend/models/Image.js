// filepath: models/Image.js
import mongoose from 'mongoose';

const ImageSchema = new mongoose.Schema({
  filename: String,
  url: String,
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;