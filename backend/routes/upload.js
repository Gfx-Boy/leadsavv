import express from 'express';
import { upload, uploadImages } from '../controllers/uploadController.js';

const router = express.Router();

// Endpoint to handle image uploads
router.post('/upload', upload.array('files'), uploadImages);

export default router;