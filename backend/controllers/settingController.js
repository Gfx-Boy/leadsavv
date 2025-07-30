import Setting from '../models/Setting.js';

// Create or update user settings
export const createOrUpdateSettings = async (req, res) => {
  const { userId } = req;
  const { emailSettings } = req.body;

  try {
    const settings = await Setting.findOneAndUpdate(
      { userId },
      { emailSettings },
      { new: true, upsert: true }
    );
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error });
  }
};

// Get user settings
export const getSettings = async (req, res) => {
  const { userId } = req;

  try {
    const settings = await Setting.findOne({ userId });
    if (!settings) {
      return res.status(404).json({ message: 'Settings not found' });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error });
  }
};
