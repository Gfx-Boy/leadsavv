import BulkAction from '../models/BulkAction.js';

export const getBulkActions = async (req, res) => {
  try {
    const bulkActions = await BulkAction.find({ userId: req.user._id });
    res.status(200).json(bulkActions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBulkAction = async (req, res) => {
  const bulkAction = new BulkAction({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const savedBulkAction = await bulkAction.save();
    res.status(201).json(savedBulkAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBulkAction = async (req, res) => {
  try {
    const bulkAction = await BulkAction.findOne({ _id: req.params.id, userId: req.user._id });
    if (!bulkAction) {
      return res.status(404).json({ message: 'Bulk action not found.' });
    }
    res.json(bulkAction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBulkAction = async (req, res) => {
  try {
    const bulkAction = await BulkAction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!bulkAction) {
      return res.status(404).json({ message: 'Bulk action not found.' });
    }
    res.json(bulkAction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBulkAction = async (req, res) => {
  try {
    const bulkAction = await BulkAction.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!bulkAction) {
      return res.status(404).json({ message: 'Bulk action not found.' });
    }
    res.json({ message: 'Bulk action removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};