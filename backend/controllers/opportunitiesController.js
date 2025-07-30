import Opportunities from '../models/Opportunities.js';

// Create or Update Opportunities Settings
export const updateOpportunities = async (req, res) => {
  const { userId } = req; // Get userId from the request
  const {
    allowDifferentOwners,
    autoOpportunityOwnerFollower,
    autoContactOwnerFollower,
  } = req.body;

  try {
    let settings = await Opportunities.findOne({ userId }); // Find settings by userId

    if (!settings) {
      settings = new Opportunities({
        userId, // Include userId in the new settings
        allowDifferentOwners,
        autoOpportunityOwnerFollower,
        autoContactOwnerFollower,
      });
    } else {
      settings.allowDifferentOwners = allowDifferentOwners;
      settings.autoOpportunityOwnerFollower = autoOpportunityOwnerFollower;
      settings.autoContactOwnerFollower = autoContactOwnerFollower;
    }

    await settings.save();
    res.status(200).json({ message: 'Opportunities settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating opportunities settings' });
  }
};

// Get Opportunities Settings
export const getOpportunities = async (req, res) => {
  const { userId } = req; // Get userId from the request

  try {
    const settings = await Opportunities.findOne({ userId }); // Find settings by userId
    if (!settings) {
      return res.status(404).json({ message: 'Opportunities settings not found' });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching opportunities settings' });
  }
};
