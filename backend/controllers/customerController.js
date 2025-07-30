import Customer from '../models/customerModel.js';

// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, joined_date, lifetime_value } = req.body;

    const customer = new Customer({
      name,
      email,
      phone,
      joined_date,
      lifetime_value
    });

    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single customer by ID
export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, joined_date, lifetime_value } = req.body;

    const customer = await Customer.findByIdAndUpdate(
      id,
      { name, email, phone, joined_date, lifetime_value, updated_at: Date.now() },
      { new: true }
    );

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error deleting customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};