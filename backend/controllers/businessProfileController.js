import BusinessProfile from '../models/BusinessProfile.js';

// Create a new Business Profile
export const createBusinessProfile = async (req, res) => {
  const { businessName, businessEmail, businessPhone, businessAddress } = req.body;

  console.log('Request payload for creating business profile:', req.body); // Log the request payload

  const profile = new BusinessProfile({
    businessName,
    businessEmail,
    businessPhone,
    businessAddress,
    userId: req.userId // Associate with userId
  });

  try {
    const savedProfile = await profile.save();
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error('Error creating business profile:', error); // Log the error
    res.status(400).json({ message: error.message });
  }
};

// Create or Update Business Profile
export const updateBusinessProfile = async (req, res) => {
  try {
    const { businessName, businessEmail, businessPhone, businessAddress } = req.body;
    let profile = await BusinessProfile.findOne({ userId: req.userId });
    console.log('Existing profile found:', profile); // Log the existing profile if found

    if (!profile) {
      profile = new BusinessProfile({ 
        businessName, 
        businessEmail, 
        businessPhone, 
        businessAddress,
        userId: req.userId // Associate with userId
      });
      console.log('Creating new profile:', profile); // Log the new profile creation
    } else {
      profile.businessName = businessName;
      profile.businessEmail = businessEmail;
      profile.businessPhone = businessPhone;
      profile.businessAddress = businessAddress;
    }

    await profile.save();
    console.log('Profile saved successfully:', profile); // Log the saved profile
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};

// Get Business Profile
export const getBusinessProfile = async (req, res) => {
  try {
    const profile = await BusinessProfile.findOne({ userId: req.userId });
    if (!profile) {
      return res.status(404).json({ message: 'Business profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the profile' });
  }
};
