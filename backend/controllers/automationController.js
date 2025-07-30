import Automation from '../models/Automation.js';

export const createAutomation = async (req, res) => {
  try {
    const automation = new Automation({
      ...req.body,
      userId: req.user._id,
    });

    await automation.save();
    res.status(201).json(automation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllAutomations = async (req, res) => {
  try {
    const automations = await Automation.find({ userId: req.user._id });

    res.status(200).json(automations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAutomationById = async (req, res) => {
  try {
    const automation = await Automation.findOne({ _id: req.params.id, userId: req.user._id });

    if (!automation) return res.status(404).json({ message: 'Automation not found' });
    res.status(200).json(automation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAutomation = async (req, res) => {
  try {
    const updatedAutomation = await Automation.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedAutomation) return res.status(404).json({ message: 'Automation not found' });
    res.status(200).json(updatedAutomation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteAutomation = async (req, res) => {
  try {
    const deletedAutomation = await Automation.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!deletedAutomation) return res.status(404).json({ message: 'Automation not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
