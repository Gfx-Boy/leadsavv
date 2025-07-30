import Subscriber from '../models/Subscriber.js';

// Get all subscribers for a user
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ userId: req.userId });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscribers' });
  }
};

// Create a new subscriber
export const addSubscriber = async (req, res) => {
  try {
    // Check if a subscriber with the same email already exists for the same user
    const existingSubscriber = await Subscriber.findOne({ userId: req.userId, email: req.body.email });
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Subscriber with this email already exists for this user' });
    }

    // Create a new subscriber
    const newSubscriber = new Subscriber({ ...req.body, userId: req.userId });
    await newSubscriber.save();
    res.status(201).json(newSubscriber);
  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ message: 'Subscriber with this email already exists for this user' });
    } else {
      res.status(500).json({ message: 'Error creating subscriber', error: error.message });
    }
  }
};

// Delete a subscriber
export const deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subscriber' });
  }
};