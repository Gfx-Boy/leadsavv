import Image from '../models/Image.js';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Handle image uploads
const uploadImages = async (req, res) => {
  const files = req.files.map((file) => ({
    filename: file.filename,
    url: `/uploads/${file.filename}`,
  }));

  // Save file info to the database
  await Image.insertMany(files);

  res.json(files);
};

export { upload, uploadImages };