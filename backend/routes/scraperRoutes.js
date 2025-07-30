import express from 'express';
import {
  scrape,
  exportToCSV,
  getCSVHistory,
  deleteCSVHistory,
  scrapeStream,
} from '../controllers/scraperController.js';
import { authenticateToken } from '../middleware/auth.js';
import { checkScraperLimit } from '../middleware/subscriptionMiddleware.js';

const router = express.Router();

router.post('/scrape', authenticateToken, scrape, checkScraperLimit);
router.post('/export', authenticateToken, exportToCSV);
router.get('/history', authenticateToken, getCSVHistory);
router.delete('/scrapehistory/:id', authenticateToken, deleteCSVHistory);


router.get('/scrape/stream', authenticateToken, scrapeStream);

export default router;