import express from 'express';
import { createPipeline, getPipelines, updatePipeline, deletePipeline } from '../controllers/pipelineController.js';

const router = express.Router();

router.post('/', createPipeline);
router.get('/', getPipelines);
router.put('/:id', updatePipeline);
router.delete('/:id', deletePipeline);

export default router;