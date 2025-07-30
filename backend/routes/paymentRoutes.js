import express from 'express';
import {
  addPaymentMethod,
  getPaymentMethods,
  deletePaymentMethod,
  setDefaultPaymentMethod,
  createSubscription,
  updateSubscription,
  chargeForExtraUsage,
  updatePaymentMethod,
} from '../controllers/paymentController.js';
import { handleStripeWebhook } from '../controllers/webhookController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Middleware to validate request body for subscription plans
const validatePlanRequest = (req, res, next) => {
  const { planId, newPlanId } = req.body;
  if (!planId && !newPlanId) {
    return res.status(400).json({ message: 'Plan ID is required' });
  }
  next();
};

// Payment method routes
router.post('/add-payment-method', authenticateToken, addPaymentMethod); // Add a new payment method
router.get('/get-payment-methods', authenticateToken, getPaymentMethods); // Get all payment methods
router.delete('/delete-payment-method/:paymentMethodId', authenticateToken, deletePaymentMethod); // Delete a payment method
router.post('/set-default-payment-method', authenticateToken, setDefaultPaymentMethod); // Set a payment method as default

// Subscription routes
router.post('/create-subscription', authenticateToken, validatePlanRequest, createSubscription); // Create a subscription
router.post('/update-subscription', authenticateToken, validatePlanRequest, updateSubscription); // Update an existing subscription

// Extra usage charge route
router.post('/charge-extra', authenticateToken, chargeForExtraUsage); // Charge for extra usage beyond limits

// Update payment method route
router.post('/update-payment-method', authenticateToken, updatePaymentMethod); // Update an existing payment method

// Stripe webhook route
router.post('/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook); // Handle Stripe webhooks

export default router;