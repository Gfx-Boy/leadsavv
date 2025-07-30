import express from 'express';
import {
  getEmailsScraped,
  getScrapingUsage,
  getContacts,
  getPayments,
  getPipelines,
  getMeetings,
  getSubscriptionDetails,
} from '../controllers/dashboardController.js';
import { authenticateToken } from '../middleware/auth.js';


const router = express.Router();

// Route to get total emails scraped
router.get('/emails-scraped', authenticateToken, getEmailsScraped);

// Route to get scraping usage
router.get('/scraping-usage', authenticateToken, getScrapingUsage);

// Route to get total contacts
router.get('/contacts', authenticateToken, getContacts);

// Route to get payment history
router.get('/payments', authenticateToken, getPayments);

// Route to get pipelines
router.get('/pipelines', authenticateToken, getPipelines);

// Route to get upcoming meetings
router.get('/meetings', authenticateToken, getMeetings);

// Route to get subscription details
router.get('/subscription', authenticateToken, getSubscriptionDetails);

export default router;