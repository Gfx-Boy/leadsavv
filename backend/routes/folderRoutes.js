import express from 'express';
import { getFolders, createFolder, getFolderById, updateFolder, deleteFolder } from '../controllers/folderController.js';

const router = express.Router();

router.get('/', getFolders);
router.post('/', createFolder);
router.get('/:id', getFolderById);
router.put('/:id', updateFolder);
router.delete('/:id', deleteFolder);

export default router;