import express from 'express';
import {
  createManualAction,
  getManualActions,
  getManualActionById,
  updateManualAction,
  deleteManualAction,
} from '../controllers/manualActionController.js';

const router = express.Router();

router.post('/', createManualAction);
router.get('/', getManualActions);
router.get('/:id', getManualActionById);
router.put('/:id', updateManualAction);
router.delete('/:id', deleteManualAction);

export default router;