import Activity from '../models/activityModel.js';

// Create a new activity
export const createActivity = async (req, res) => {
  try {
    const { lead_id, type, description, date } = req.body;

    const activity = new Activity({
      lead_id,
      type,
      description,
      date
    });

    const savedActivity = await activity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    console.error('Error creating activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get all activities
export const getActivities = async (req, res) => {
  try {
    const activities = await Activity.find();
    res.status(200).json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get a single activity by ID
export const getActivityById = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update an activity
export const updateActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const { lead_id, type, description, date } = req.body;

    const activity = await Activity.findByIdAndUpdate(
      id,
      { lead_id, type, description, date, updated_at: Date.now() },
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.status(200).json(activity);
  } catch (error) {
    console.error('Error updating activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete an activity
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const activity = await Activity.findByIdAndDelete(id);
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' });
    }
    res.status(200).json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Error deleting activity:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};