import express from 'express';
import { getCompanies, createCompany, deleteCompany } from '../controllers/companyController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getCompanies);
router.post('/', authenticateToken, createCompany);
router.delete('/:id', authenticateToken, deleteCompany);

export default router;