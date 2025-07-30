import Slot from '../models/Slot.js';

// Get all slots
export const getSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ userId: req.user._id });
    res.status(200).json(slots);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new slot
export const createSlot = async (req, res) => {
  const slot = new Slot({
    ...req.body,
    userId: req.user._id,
  });

  try {
    const savedSlot = await slot.save();
    res.status(201).json(savedSlot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single slot by ID
export const getSlot = async (req, res) => {
  try {
    const slot = await Slot.findOne({ _id: req.params.id, userId: req.user._id });
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found.' });
    }
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a slot
export const updateSlot = async (req, res) => {
  try {
    const slot = await Slot.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found.' });
    }
    res.json(slot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a slot
export const deleteSlot = async (req, res) => {
  try {
    const slot = await Slot.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found.' });
    }
    res.json({ message: 'Slot removed successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
