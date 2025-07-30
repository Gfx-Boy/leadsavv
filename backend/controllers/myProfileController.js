import MyProfile from '../models/MyProfile.js';

// Create or Update My Profile
export const updateMyProfile = async (req, res) => {
  const { userId } = req; // Get userId from the request
  const { firstName, lastName, email, phone } = req.body;

  try {
    let profile = await MyProfile.findOne({ userId }); // Find profile by userId

    if (!profile) {
      profile = new MyProfile({ userId, firstName, lastName, email, phone }); // Include userId in the new profile
    } else {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.email = email;
      profile.phone = phone;
    }

    await profile.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the profile' });
  }
};

// Get My Profile
export const getMyProfile = async (req, res) => {
  const { userId } = req; // Get userId from the request

  try {
    const profile = await MyProfile.findOne({ userId }); // Find profile by userId
    if (!profile) {
      return res.status(404).json({ message: 'My profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the profile' });
  }
};
