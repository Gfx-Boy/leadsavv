import Segment from '../models/Segment.js';
import Subscriber from '../models/Subscriber.js'; // Assuming you have a Subscriber model

// Get all segments for the logged-in user
export const getSegments = async (req, res) => {
  try {
    const segments = await Segment.find({ userId: req.userId });
    res.status(200).json(segments);
  } catch (error) {
    console.error('Error fetching segments:', error);
    res.status(500).json({ message: 'Failed to fetch segments' });
  }
};

// Get subscribers in a segment
export const getSegmentSubscribers = async (req, res) => {
  try {
    const segment = await Segment.findOne({ _id: req.params.id, userId: req.userId });
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found or not authorized' });
    }

    const subscribers = await Subscriber.find({
      userId: req.userId,
      $and: segment.criteria.map((criterion) => {
        const [key, value] = criterion.split(':');
        return { [key]: value };
      }),
    });

    res.status(200).json(subscribers.map((subscriber) => subscriber.email));
  } catch (error) {
    console.error('Error fetching subscribers for segment:', error);
    res.status(500).json({ message: 'Failed to fetch subscribers for segment' });
  }
};

// Create a new segment
export const createSegment = async (req, res) => {
  try {
    const { name, criteria } = req.body;

    if (!name || !criteria || criteria.length === 0) {
      return res.status(400).json({ message: 'Name and criteria are required' });
    }

    const subscriberCount = await Subscriber.countDocuments({
      userId: req.userId,
      $and: criteria.map((criterion) => {
        const [key, value] = criterion.split(':');
        return { [key]: value };
      }),
    });

    const segment = new Segment({
      userId: req.userId,
      name,
      criteria,
      count: subscriberCount,
    });

    await segment.save();
    res.status(201).json({ message: 'Segment created successfully', segment });
  } catch (error) {
    console.error('Error creating segment:', error);
    res.status(500).json({ message: 'Failed to create segment' });
  }
};

// Update an existing segment
export const updateSegment = async (req, res) => {
  try {
    const { name, criteria } = req.body;

    if (!name || !criteria || criteria.length === 0) {
      return res.status(400).json({ message: 'Name and criteria are required' });
    }

    const segment = await Segment.findOne({ _id: req.params.id, userId: req.userId });
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found or not authorized' });
    }

    const subscriberCount = await Subscriber.countDocuments({
      userId: req.userId,
      $and: criteria.map((criterion) => {
        const [key, value] = criterion.split(':');
        return { [key]: value };
      }),
    });

    segment.name = name;
    segment.criteria = criteria;
    segment.count = subscriberCount;

    await segment.save();
    res.status(200).json({ message: 'Segment updated successfully', segment });
  } catch (error) {
    console.error('Error updating segment:', error);
    res.status(500).json({ message: 'Failed to update segment' });
  }
};

// Delete a segment
export const deleteSegment = async (req, res) => {
  try {
    const segment = await Segment.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!segment) {
      return res.status(404).json({ message: 'Segment not found or not authorized' });
    }
    res.status(200).json({ message: 'Segment deleted successfully' });
  } catch (error) {
    console.error('Error deleting segment:', error);
    res.status(500).json({ message: 'Failed to delete segment' });
  }
};