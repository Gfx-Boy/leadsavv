import ManualAction from '../models/ManualAction.js';

export const createManualAction = async (req, res) => {
  const manualAction = new ManualAction({
    ...req.body,
    userId: req.user._id, // Associate manual action with the authenticated user
  });


  try {
    const savedManualAction = await manualAction.save();
    res.status(201).json(savedManualAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all manual actions
export const getManualActions = async (req, res) => {
  try {
    const manualActions = await ManualAction.find({ userId: req.user._id });
    res.status(200).json(manualActions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getManualActionById = async (req, res) => {
  try {
    const manualAction = await ManualAction.findOne({ _id: req.params.id, userId: req.user._id });

    if (!manualAction) return res.status(404).json({ message: 'Manual action not found' });
    res.status(200).json(manualAction);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateManualAction = async (req, res) => {
  try {
    const manualAction = await ManualAction.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!manualAction) return res.status(404).json({ message: 'Manual action not found' });
    res.status(200).json(manualAction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteManualAction = async (req, res) => {
  try {
    const manualAction = await ManualAction.findOneAndDelete({ _id: req.params.id, userId: req.user._id });

    if (!manualAction) return res.status(404).json({ message: 'Manual action not found' });
    res.status(200).json({ message: 'Manual action deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
