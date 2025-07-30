import express from 'express';
import { createBulkAction, getBulkActions, updateBulkAction, deleteBulkAction } from '../controllers/bulkActionController.js';

const router = express.Router();

router.post('/', createBulkAction);
router.get('/', getBulkActions);
router.put('/:id', updateBulkAction);
router.delete('/:id', deleteBulkAction);

export default router;