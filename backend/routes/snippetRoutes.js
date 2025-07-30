import express from 'express';
import { getSnippets, createSnippet, getSnippet, updateSnippet, deleteSnippet } from '../controllers/snippetController.js';

const router = express.Router();

router.get('/', getSnippets);
router.post('/', createSnippet);
router.get('/:id', getSnippet);
router.put('/:id', updateSnippet);
router.delete('/:id', deleteSnippet);

export default router;