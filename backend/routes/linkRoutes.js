import express from 'express';
import { getLinks, createLink, deleteLink } from '../controllers/linkController.js';

const router = express.Router();

router.get('/', getLinks);
router.post('/', createLink);
router.delete('/:id', deleteLink);

export default router;