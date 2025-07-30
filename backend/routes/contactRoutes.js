import express from 'express';
import { getContacts, createContact, deleteContact, getDeletedContacts, restoreContact, permanentlyDeleteContact } from '../controllers/contactController.js';
import { authenticateToken } from '../middleware/auth.js'; // Add this import

const router = express.Router();

router.get('/', authenticateToken, getContacts);
router.post('/', authenticateToken, createContact);
router.delete('/:id', authenticateToken, deleteContact);
router.get('/deleted', authenticateToken, getDeletedContacts); // Route to fetch deleted contacts
router.patch('/restore/:id',authenticateToken, restoreContact); // Route to restore a contact
router.delete('/permanent/:id', authenticateToken, permanentlyDeleteContact); // Route to permanently delete a contact
export default router;
