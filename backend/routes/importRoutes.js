import express from 'express';
import { importContacts, importOpportunities, getImportHistory } from '../controllers/importController.js';

const router = express.Router();

router.post('/contacts', importContacts);
router.post('/opportunities', importOpportunities);
router.get('/history', getImportHistory);

export default router;