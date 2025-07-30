import express from 'express';
import {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
} from '../controllers/customerController.js';

const router = express.Router();

/*
 * POST a new customer
 */
router.post('/customers', createCustomer);

/*
 * GET all customers
 */
router.get('/customers', getCustomers);

/*
 * GET a single customer by ID
 */
router.get('/customers/:id', getCustomerById);

/*
 * PUT to update an existing customer
 */
router.put('/customers/:id', updateCustomer);

/*
 * DELETE a customer
 */
router.delete('/customers/:id', deleteCustomer);

export default router;