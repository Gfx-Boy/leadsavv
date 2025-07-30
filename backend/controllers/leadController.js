import Lead from '../models/leadModel.js';

// Create a new lead
export const createLead = async (req, res) => {
  try {
    const { name, email, phone, source, status } = req.body;

    const lead = new Lead({
      name,
      email,
      phone,
      source,
      status
    });

    const savedLead = await lead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all leads
export const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single lead by ID
export const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update a lead
export const updateLead = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, source, status } = req.body;

    const lead = await Lead.findByIdAndUpdate(
      id,
      { name, email, phone, source, status, updated_at: Date.now() },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    res.status(200).json(lead);
  } catch (error) {
    console.error('Error updating lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete a lead
export const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};