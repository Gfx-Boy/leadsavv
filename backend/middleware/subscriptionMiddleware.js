import User from '../models/userModel.js';

export const checkEmailLimit = async (req, res, next) => {
  try {
    console.log('Checking email limit for userId:', req.userId); // Debugging log

    // Use req.userId instead of req.user.id
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emailUsage >= user.emailLimit) {
      return res.status(403).json({
        code: 'PLAN_LIMIT_REACHED',
        message: 'Email limit exceeded. Upgrade your plan to send more emails.',
      });
    }

    console.log('Email limit check passed for userId:', req.userId);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in checkEmailLimit middleware:', error); // Log the actual error
    res.status(500).json({ error: error.message });
  }
};

export const checkScraperLimit = async (req, res, next) => {
  try {
    console.log('Checking scraper limit for userId:', req.userId); // Debugging log

    // Use req.userId instead of req.user.id
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.scraperUsage >= user.scraperLimit) {
      return res.status(403).json({
        code: 'PLAN_LIMIT_REACHED',
        message: 'Scraper limit exceeded. Upgrade your plan to scrape more data.',
      });
    }

    console.log('Scraper limit check passed for userId:', req.userId);
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in checkScraperLimit middleware:', error); // Log the actual error
    res.status(500).json({ error: error.message });
  }
};