import Contact from '../models/Contact.js';
import ContactAddedHistory from '../models/contactAddedHistory.js';
export const getContacts = async (req, res) => {
  try {
    // Fetch only non-deleted contacts
    const contacts = await Contact.find({ userId: req.userId, deleted: false });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  const contact = new Contact({
    ...req.body,
    userId: req.userId,
  });

  try {
    // Save the contact to the database
    const savedContact = await contact.save();

    // Update the contact history for the current day
    const today = new Date().setHours(0, 0, 0, 0); // Get today's date without time
    await ContactAddedHistory.findOneAndUpdate(
      { userId: req.userId, date: today }, // Find the record for the current user and date
      { $inc: { count: 1 } }, // Increment the count by 1
      { new: true, upsert: true } // Create a new record if it doesn't exist
    );

    res.status(201).json(savedContact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(400).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { deleted: true },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    res.json({ message: 'Contact moved to restore list successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getDeletedContacts = async (req, res) => {
  try {
    const deletedContacts = await Contact.find({ userId: req.userId, deleted: true });
    res.status(200).json(deletedContacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const restoreContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId, deleted: true },
      { deleted: false },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found in restore list.' });
    }

    res.json({ message: 'Contact restored successfully.', contact });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const permanentlyDeleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
      deleted: true, // Ensure it is a deleted contact
    });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found in restore list.' });
    }

    res.json({ message: 'Contact permanently deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
