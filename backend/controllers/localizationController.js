import Localization from '../models/Localization.js';

// Create or Update Localization Settings
export const updateLocalization = async (req, res) => {
  const { userId } = req; // Get userId from the request
  const {
    defaultLanguage,
    regionFormat,
    timeZone,
    timeFormat,
    dateFormat,
    firstDayOfWeek,
    currency,
    numberFormat,
  } = req.body;

  try {
    let settings = await Localization.findOne({ userId }); // Find settings by userId

    if (!settings) {
      settings = new Localization({
        userId, // Include userId in the new settings
        defaultLanguage,
        regionFormat,
        timeZone,
        timeFormat,
        dateFormat,
        firstDayOfWeek,
        currency,
        numberFormat,
      });
    } else {
      settings.defaultLanguage = defaultLanguage;
      settings.regionFormat = regionFormat;
      settings.timeZone = timeZone;
      settings.timeFormat = timeFormat;
      settings.dateFormat = dateFormat;
      settings.firstDayOfWeek = firstDayOfWeek;
      settings.currency = currency;
      settings.numberFormat = numberFormat;
    }

    await settings.save();
    res.status(200).json({ message: 'Localization settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating localization settings' });
  }
};

// Get Localization Settings
export const getLocalization = async (req, res) => {
  const { userId } = req; // Get userId from the request

  try {
    const settings = await Localization.findOne({ userId }); // Find settings by userId
    if (!settings) {
      return res.status(404).json({ message: 'Localization settings not found' });
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching localization settings' });
  }
};
