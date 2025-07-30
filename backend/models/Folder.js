import mongoose from 'mongoose';

const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  count: { type: Number, default: 0 },
});

const Folder = mongoose.model('Folder', folderSchema);

export default Folder;