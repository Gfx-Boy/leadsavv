import ContactAddedHistory from '../models/contactAddedHistory.js';
import EmailScrapedHistory from '../models/emailScrapedHistory.js';

export const getEmailScrapedHistory = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from authentication middleware

    // Fetch email scraping history for the user
    const emailHistory = await EmailScrapedHistory.find({ userId }).sort({ date: 1 });

    res.status(200).json(emailHistory);
  } catch (error) {
    console.error('Error fetching email scraped history:', error);
    res.status(500).json({ message: 'An error occurred while fetching email scraped history.' });
  }
};

export const getContactAddedHistory = async (req, res) => {
  try {
    const userId = req.userId; // Extracted from authentication middleware

    // Fetch contact addition history for the user
    const contactHistory = await ContactAddedHistory.find({ userId }).sort({ date: 1 });

    res.status(200).json(contactHistory);
  } catch (error) {
    console.error('Error fetching contact added history:', error);
    res.status(500).json({ message: 'An error occurred while fetching contact added history.' });
  }
};

export const addEmailScrapedHistory = async (req, res) => {
  try {
    const { date, count } = req.body; // Date and count from the request body
    const userId = req.userId; // Extracted from authentication middleware

    // Normalize the date to remove time
    const formattedDate = new Date(date).setHours(0, 0, 0, 0);

    // Find or create a record for the current user and date
    const history = await EmailScrapedHistory.findOneAndUpdate(
      { userId, date: formattedDate },
      { $inc: { count } }, // Increment the count
      { new: true, upsert: true } // Create a new record if it doesn't exist
    );

    res.status(201).json(history);
  } catch (error) {
    console.error('Error adding email scraped history:', error);
    res.status(500).json({ message: 'An error occurred while adding email scraped history.' });
  }
};

export const addContactAddedHistory = async (req, res) => {
    try {
      const { date, count } = req.body; // Date and count from the request body
      const userId = req.userId; // Extracted from authentication middleware
  
      // Normalize the date to remove time
      const formattedDate = new Date(date).setHours(0, 0, 0, 0);
  
      // Find or create a record for the current user and date
      const history = await ContactAddedHistory.findOneAndUpdate(
        { userId, date: formattedDate },
        { $inc: { count } }, // Increment the count
        { new: true, upsert: true } // Create a new record if it doesn't exist
      );
  
      res.status(201).json(history);
    } catch (error) {
      console.error('Error adding contact added history:', error);
      res.status(500).json({ message: 'An error occurred while adding contact added history.' });
    }
  };