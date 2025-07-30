import CsvHistory from '../models/CsvHistory.js';

// Get all CSV histories
export const getCsvHistories = async (req, res) => {
  try {
    const csvHistories = await CsvHistory.find({ userId: req.user._id });
    res.status(200).json(csvHistories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new CSV history
export const createCsvHistory = async (req, res) => {
  const csvHistory = new CsvHistory({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const savedCsvHistory = await csvHistory.save();
    res.status(201).json(savedCsvHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single CSV history by ID
export const getCsvHistory = async (req, res) => {
  try {
    const csvHistory = await CsvHistory.findById(req.params.id);
    if (!csvHistory) return res.status(404).json({ message: 'CSV history not found' });
    res.status(200).json(csvHistory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update a CSV history
export const updateCsvHistory = async (req, res) => {
  try {
    const csvHistory = await CsvHistory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!csvHistory) return res.status(404).json({ message: 'CSV history not found' });
    res.status(200).json(csvHistory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a CSV history
export const deleteCsvHistory = async (req, res) => {
  try {
    const csvHistory = await CsvHistory.findByIdAndDelete(req.params.id);
    if (!csvHistory) return res.status(404).json({ message: 'CSV history not found' });
    res.status(200).json({ message: 'CSV history deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};