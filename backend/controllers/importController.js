import Contact from '../models/Contact.js';
import Opportunity from '../models/Opportunity.js';
import ImportHistory from '../models/ImportHistory.js';

export const importContacts = async (req, res) => {
  try {
    const userId = req.userId; // Ensure userId is extracted from the authenticated user's token
    const contacts = req.body.map(contact => ({ ...contact, userId }));
    const result = await Contact.insertMany(contacts);
    await ImportHistory.create({ type: 'contacts', count: contacts.length, userId });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error importing contacts:', error);
    res.status(400).json({ message: error.message });
  }
};

export const importOpportunities = async (req, res) => {
  try {
    const userId = req.userId; // Ensure userId is extracted from the authenticated user's token
    const opportunities = req.body.map(opportunity => ({ ...opportunity, userId }));
    const result = await Opportunity.insertMany(opportunities);
    await ImportHistory.create({ type: 'opportunities', count: opportunities.length, userId });
    res.status(201).json(result);
  } catch (error) {
    console.error('Error importing opportunities:', error);
    res.status(400).json({ message: error.message });
  }
};

export const getImportHistory = async (req, res) => {
  try {
    const history = await ImportHistory.find({ userId: req.userId }).sort({ timestamp: -1 });
    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching import history:', error);
    res.status(500).json({ message: error.message });
  }
};