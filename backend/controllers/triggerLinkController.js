import TriggerLink from '../models/TriggerLink.js';

// Create a new trigger link
export const createTriggerLink = async (req, res) => {
  const triggerLink = new TriggerLink({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const savedTriggerLink = await triggerLink.save();
    res.status(201).json(savedTriggerLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all trigger links
export const getTriggerLinks = async (req, res) => {
  try {
    const triggerLinks = await TriggerLink.find({ userId: req.user._id });
    res.status(200).json(triggerLinks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single trigger link by ID
export const getTriggerLinkById = async (req, res) => {
  try {
    const triggerLink = await TriggerLink.findOne({ _id: req.params.id, userId: req.user._id });
    if (!triggerLink) return res.status(404).json({ message: 'Trigger link not found' });
    res.status(200).json(triggerLink);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


// Update a trigger link
export const updateTriggerLink = async (req, res) => {
  try {
    const triggerLink = await TriggerLink.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!triggerLink) return res.status(404).json({ message: 'Trigger link not found' });
    res.status(200).json(triggerLink);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a trigger link
export const deleteTriggerLink = async (req, res) => {
  try {
    const triggerLink = await TriggerLink.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!triggerLink) return res.status(404).json({ message: 'Trigger link not found' });
    res.status(200).json({ message: 'Trigger link deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
